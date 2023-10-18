// a hack because of the way we've implemented the toast component as a web component in a shadow dom (not directly accessible to content scripts)
document.addEventListener("showToastEvent", function (e) {	
	try {
		const message = e.detail.message;
		//? https://github.com/mixpanel/analytics/tree/master/iron/common/components/toast
		document.querySelector("#MIXPANEL_DEBUG_ROOT").shadowRoot.querySelector("#toast-area").addToast({
			message,
			cta: 'go to link',
			hide: false,
			type: 'info',
			timeout: 5000000000
		});
	}
	catch (err) {
		console.log(`failed to show toast`, err);
	}
});
