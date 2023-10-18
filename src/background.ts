import browser, { type WebRequest } from 'webextension-polyfill';
import { detect } from 'detect-browser';
import type { ParsedRequest } from './models';
import settingsConnector from './settings-connector';

import { getFromStorage, setToStorage } from './utils.js';
const urls = ['*://*/*track*', '*://*/*engage*'];

console.log('background script running...');

// listen for messages from the popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
});

// capture requests to mixpanel
browser.webRequest.onBeforeRequest.addListener(handleCaughtRequest, { urls }, [
  'requestBody'
]);

// capture responses from mixpanel
browser.webRequest.onCompleted.addListener(handleCaughtResponse, { urls }, [
  'extraHeaders',
  'responseHeaders'
]);

function handleCaughtRequest(details: WebRequest.OnBeforeRequestDetailsType) {
  const data = parseRequest(details);
  if (!data) return;
  const { tabId } = details;
  storeRequests(data)
    .then(() => {})
    .catch(e => {
      console.log('error storing requests', e);
    });
  browser.tabs.sendMessage(tabId, data);
  console.log('caught REQ', data.url);
}

function handleCaughtResponse(details: WebRequest.OnCompletedDetailsType) {
  // Access the URL and request body
  console.log('caught RESP', details.url, details.statusCode);
}

function parseRequest(
  details: WebRequest.OnBeforeRequestDetailsType
): ParsedRequest | null {
  const {
    url,
    requestBody,
    initiator,
    incognito,
    timeStamp,
    type,
    tabId,
    originUrl
  } = details;

  let records = [];

  if (requestBody?.formData) {
    try {
      //new SDK sends data w/simple stringify
      records = JSON.parse(requestBody.formData.data);
      console.log('caught', records);
    } catch (e) {
      //old SDK does base64 encoding
      try {
        // @ts-ignore
        records = JSON.parse(atob(requestBody.formData.data.join('')));
      } catch (e) {
        //we're screwed!
        console.log('error parsing json', e);
      }
    }
  } else if (requestBody?.raw) {
    try {
      records = JSON.parse(requestBody.raw[0].bytes);
      console.log('caught', records);
    } catch (e) {
      console.log('error parsing json', e);
      return null;
    }
  } else {
    console.log('no request body');
    return null;
  }

  let endpoint: '/track' | '/engage' | '/unknown';
  if (url.includes('track')) endpoint = '/track';
  else if (url.includes('engage')) endpoint = '/engage';
  else endpoint = '/unknown';

  return {
    url,
    initiator,
    incognito,
    timeStamp,
    type,
    tabId,
    originUrl,
    records,
    endpoint
  };
}

async function storeRequests(data: ParsedRequest) {
  const { initiator, timeStamp, records = [], endpoint } = data;
  for (const record of records) {
    let token;
    if (endpoint === '/track') token = record.properties.token;
    else if (endpoint === '/engage') token = record.$token;
    else token = 'unknown';
    const STORED = await getFromStorage(token);

    STORED.unshift({
      initiator,
      timeStamp,
      endpoint,
      data: record
    });

    await setToStorage(token, STORED);
  }
}
