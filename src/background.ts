import browser, { type WebRequest } from 'webextension-polyfill';
import { detect } from 'detect-browser';
import type { ParsedRequest } from './models';
import settingsConnector from './settings-connector';
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
browser.webRequest.onCompleted.addListener(handleCaughtResponse, { urls });

function handleCaughtRequest(details: WebRequest.OnBeforeRequestDetailsType) {
  const data = parseRequest(details);
  const { tabId } = details;
  storeRequest(data);
  browser.tabs.sendMessage(tabId, data);
  console.log('caught REQ', data.url);
}

function handleCaughtResponse(details: WebRequest.OnCompletedDetailsType) {
  // Access the URL and request body
  console.log('caught RESP', details.url, details.statusCode);
}

function parseRequest(
  details: WebRequest.OnBeforeRequestDetailsType
): ParsedRequest {
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
    }
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

function storeRequest(data) {}
