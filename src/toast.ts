import browser from 'webextension-polyfill';
import { type ParsedRequest } from './models';
import Toastify from 'toastify-js';
import { prettyJson } from './utils';

console.log('CONTENT SCRIPT RAN');
let shadowCache: ShadowRoot | null = null;

const profileOperations = [
  '$set',
  '$set_once',
  '$unset',
  '$append',
  '$remove',
  '$union',
  '$delete'
];

browser.runtime.onMessage.addListener((data: ParsedRequest) => {
  const { records = [], endpoint } = data;

  //refactor
  for (const record of records) {
    let message;
    let type;
    if (endpoint === '/track') {
      const name = record.event;
      type = 'event';
      message = `event: ${name}`;
    } else if (endpoint === '/engage') {
      const distinct_id = record.$distinct_id;
      const operation =
        Object.keys(record)
          .filter(key => profileOperations.includes(key))
          .slice()
          .pop() || '$unknown';
      type = 'profile';
      message = `profile ${operation}: ${distinct_id}`;
    } else {
      message = `something isn't right`;
      console.error(`Record`, record, `Endpoint`, endpoint);
    }

    try {
      createToastWithShadowDOM(message, record);
    } catch (e) {
      console.log('error creating toast', e);
      debugger;
    }
  }
});


function createToastWithShadowDOM(message: string, record: Object) {
  let shadow;
  // Create a new div to attach the shadow root
  if (!shadowCache) {
    const toastContainer = document.createElement('div');
	toastContainer.id = 'MIXPANEL_DEBUG_ROOT';
    document.body.appendChild(toastContainer);

    shadow = toastContainer.attachShadow({ mode: 'open' });
    injectAssets(shadow, () => {
      triggerShowToastInPage(message);
    });

    shadowCache = shadow;
  } else {
    shadow = shadowCache;
  }
  triggerShowToastInPage(message);
}


function triggerShowToastInPage(message = "foo") {
  const event = new CustomEvent('showToastEvent', {
    detail: { message }
  });
  document.dispatchEvent(event);
}


// essentially bundling our entire design system...
function injectAssets(shadowDom: ShadowRoot, callback: Function) {
	let scriptsToLoad = 4; 
	const assets = [];
  
	// CSS assets
	const cssFiles = ['public/mixpanel.css', 'public/bundle.min.css'];
	cssFiles.forEach(file => {
	  const link = document.createElement('link');
	  link.rel = 'stylesheet';
	  link.href = browser.runtime.getURL(file);
	  shadowDom.appendChild(link);
	});
  
	// JS assets
	const jsFiles = [
	  'public/iron.min.js',
	  'public/runtime.min.js',
	  'public/node_modules.min.js',
	  'public/injectToasts.js'
	];
	jsFiles.forEach(file => {
	  const script = document.createElement('script');
	  script.onload = () => {
		scriptsToLoad--;
		if (scriptsToLoad === 0) {
		  // Create the <mp-toast-area> after all scripts have loaded
		  const toastArea = document.createElement('mp-toast-area');
		  toastArea.id = 'toast-area';
		  shadowDom.appendChild(toastArea);
		  callback();
		}
	  };
	  script.src = browser.runtime.getURL(file);
	  shadowDom.appendChild(script);
	});
  }