document.addEventListener("showToastEvent", function (e) {
	try {
		const ROOT = document.querySelector("#MIXPANEL_DEBUG_ROOT").shadowRoot;
		const toastArea = ROOT.querySelector("#toast-area");
		let message = e.detail.message;
		const record = e.detail.record;
		const type = e.detail.type;
		//? https://github.com/mixpanel/analytics/blob/master/iron/common/components/toast-area/index.ts#L21
		const toastProps = {
			message,
			cta: "→",
			hide: false,
			type: "success",
			
			timeout: 5000,
			closeToastCallback: () => {
				// // make sure toasts don't stay mounted to the DOM
				// setTimeout(() => {
				// 	toastArea.clearAllToasts();
				// }, 5000);
			},
			ctaCallback: () => {
				// this is not displaying correctly
				const infoModal = document.createElement("mp-modal");
				infoModal.setAttribute(`closeable`, `true`);
				infoModal.setAttribute(`open`, `true`);
				infoModal.setAttribute(`modal-type`, `popup`);
				infoModal.setAttribute(`grow-to-content`, `true`);
				infoModal.innerHTML = `
				<div class="mp-modal-content">
				${type === "event" ? MIXPANEL_EVENT_ICON : MIXPANEL_PROFILE_ICON}
					<div class="mp-modal-title">${type}</div>
					<div class="mp-modal-subtitle">
						<pre>${prettyJson(record)}</pre>
					</div>
				</div>`;
				ROOT.appendChild(infoModal);
			},
		};

		//this works great!
		toastArea.addToast(toastProps);
	} catch (err) {
		console.log(`failed to show toast`, err);
	}
});

function prettyJson(data, ignoreKeys = [], indentLevel = 0) {
	if (!data || typeof data !== "object") return data;

	let prettyOpts = ``;
	let indent = "\t".repeat(indentLevel);

	for (const key in data) {
		if (data.hasOwnProperty(key) && !ignoreKeys.includes(key)) {
			let val = data[key];

			// Skip if the value is undefined
			if (val === undefined) continue;

			if (typeof val === "function") {
				val = val.toString();
			} else if (typeof val === "object") {
				if (val === null) {
					val = "null";
				} else if (Array.isArray(val) || val instanceof Set) {
					// @ts-ignore
					if (!val.size && val instanceof Set) continue; // Check if set is empty
					// @ts-ignore
					if (!val.length && Array.isArray(val)) continue; // Check if array is empty
					val = Array.from(val)
						.map((item) => prettyJson(item, ignoreKeys, indentLevel + 1))
						.join(",\n");
				} else {
					// Check if object is empty and represent it as "{}"
					try {
						if (Object.keys(val).length === 0) {
							val = "{}";
						} else {
							val = "\n\t" + prettyJson(val, ignoreKeys, indentLevel + 1) + "\n" + indent;
						}
					} catch (e) { }
				}
			}

			prettyOpts += `${indent}${key}: ${val}\n`;
		}
	}

	return prettyOpts.trim();
}

const MIXPANEL_EVENT_ICON = `<svg-icon icon="event"><svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M9.014 9.64l3.068 8.766a.2.2 0 00.381-.01l1.376-4.803 4.54-1.297a.2.2 0 00.008-.382L9.644 9a.5.5 0 00-.63.64z" stroke="currentColor" stroke-width="1.5"></path><path d="M9 3v2M3 9h2M4.786 13.164L6.2 11.75M13.573 4.813L12.16 6.228M4.814 4.813l1.414 1.415" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg></svg-icon>`

const MIXPANEL_PROFILE_ICON = `<svg-icon icon="profile"><svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><path d="M13.83 15.5a1 1 0 0 0 1-1.28A4 4 0 0 0 11 11.5h0a4 4 0 0 0-3.79 2.72 1 1 0 0 0 1 1.28z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path><circle cx="11" cy="8.5" r="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></circle><rect x="3" y="3" width="16" height="16" rx="2" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></rect></svg>
</svg-icon>`