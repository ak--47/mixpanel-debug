import Toast from './toast.svelte';
// Export the Toast component to window object
window['MIXPANEL_DEBUG_TOAST'] = Toast;
const event = new Event('MIXPANEL_TOAST_READY');
window.dispatchEvent(event);