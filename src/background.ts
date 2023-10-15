import browser, { type WebRequest } from 'webextension-polyfill';
import { detect } from 'detect-browser';
import type { BrowserMessage, BrowserMessageType, ColorScheme } from './models';
import settingsConnector from './settings-connector';

console.log('background script running...');

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('got message', message);
  switch (message.type as BrowserMessageType) {
    case 'gotColorScheme': {
      updateIcon(message.value as ColorScheme).then(sendResponse);
      return true;
    }
  }
});

async function updateIcon(colorScheme: ColorScheme) {
  console.log('updating icon', colorScheme);
  // do work here
}

browser.webRequest.onBeforeRequest.addListener(
  handleCaughtRequest,
  { urls: ['*://*/*track*', '*://*/*engage*'] },
  ['requestBody']
);

function handleCaughtRequest(details: WebRequest.OnBeforeRequestDetailsType) {
  // Access the URL and request body
  const url = details.url;
  storeRequest(details);
  console.log('Request URL:', url);

  if (details.requestBody && details.requestBody.raw) {
    console.log('Request Body:', details.requestBody);
  }
}

// To capture the server response:
browser.webRequest.onCompleted.addListener(
  details => {
    console.log('Response for:', details.url);
    console.log('Status:', details.statusCode);
    // Note: This doesn't capture the response body. Capturing response body is trickier and requires additional handling.
  },
  { urls: ['*://*/*track*'] }
);

function storeRequest(details: WebRequest.OnBeforeRequestDetailsType) {
  const { url, requestBody, initiator, incognito, timeStamp, type } = details;
  let records = [];
  if (requestBody?.formData) {
    try {
      records = JSON.parse(requestBody.formData.data);
    } catch (e) {
      console.log('error parsing json', e);
    }
  }

  console.log(records);

}
