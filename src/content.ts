import browser from 'webextension-polyfill';
import { type BrowserMessageType, type ColorScheme } from './models';
console.log('CONTENT SCRIPT RAN');

injectCSS(browser.runtime.getURL('/dist/toast.css'));

injectScript(browser.runtime.getURL('/dist/toast.js')).then(() => {
  console.log('TOAST JS INJECTED');
});

window.addEventListener('MIXPANEL_TOAST_READY', () => {
  console.log('TOAST READY');
});

browser.runtime.onMessage.addListener(message => {
  console.log('GOT REQ FROM WORKER', message);

  // Instantiate the Svelte component
  toast();
  
});

function toast(message = 'mixpanel event!', duration = 3000) {
  new window.MIXPANEL_DEBUG_TOAST({
    target: document.body,
    props: {
      message: message,
      duration: duration
    }
  });
}

function injectScript(file_path) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = file_path;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

function injectCSS(file_path) {
  const link = document.createElement('link');
  link.href = file_path;
  link.type = 'text/css';
  link.rel = 'stylesheet';
  document.head.appendChild(link);
}

// TURN ALL THIS JAZZ INTO A SVELTE COMPONENT
function showToast(message, duration = 3000) {
  let toast = createToast(message);
  document.body.appendChild(toast);

  // Display the toast and then hide after `duration` milliseconds
  toast.style.display = 'block';
  setTimeout(() => {
    toast.style.display = 'none';
    document.body.removeChild(toast);
  }, duration);
}

function createToast(message) {
  let toast = document.createElement('div');
  toast.id = 'my-extension-toast';
  toast.textContent = message;
  toast.style.position = 'fixed';
  toast.style.bottom = '10px';
  toast.style.left = '50%';
  toast.style.transform = 'translateX(-50%)';
  toast.style.backgroundColor = 'black';
  toast.style.color = 'white';
  toast.style.padding = '10px 20px';
  toast.style.borderRadius = '5px';
  toast.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.5)';
  toast.style.zIndex = '9999'; // ensure it's on top
  toast.style.fontFamily = 'Arial, sans-serif';
  toast.style.fontSize = '14px';
  toast.style.display = 'none'; // initially hidden
  return toast;
}
