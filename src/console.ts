// this is injected into the page as a content script
(function () {
	if (Boolean(window.mixpanel) === false) {
	  return;
	}
  
	mixpanel.track = function (event, props) {
	  const ignoredEventPrefixes = [`Browser API fetch`, `[ui-perf]`];
  
	  if (ignoredEventPrefixes.some((prefix) => event.startsWith(prefix))) {
		return;
	  }
  
	  console.groupCollapsed(`%c${event}`, "color: white; background: #4F44E0");
  
	  props = Object.entries(props).reduce((final, [key, value]) => {
		final[key] = Array.isArray(value) || JSON.stringify(value);
		return final;
	  }, {});
  
	  console.table(props);
	  console.groupEnd();
	};
  })();