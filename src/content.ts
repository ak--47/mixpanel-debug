import browser from 'webextension-polyfill';
import { SvelteToast, toast } from '@zerodevx/svelte-toast/dist';
import { type BrowserMessageType, type ColorScheme } from './models';
console.log('CONTENT SCRIPT RAN');

const app = new SvelteToast({
  target: document.body,
  props: {
    options: {}
  }
});

browser.runtime.onMessage.addListener(data => {
  const { records = [], endpoint } = data;

  for (const record of records) {
    const suffix = endpoint;
    const name = record.event || 'update';
    const prefix = suffix === '/track' ? 'event' : 'profile';
    const message = `${prefix}: ${name} (${suffix})`;

    toast.push(message, {
      theme: {},
      duration: 2000
    });
  }
});
