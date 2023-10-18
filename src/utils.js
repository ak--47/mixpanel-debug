import browser from 'webextension-polyfill';

export async function snapshotStorage() {
  try {
    return await browser.storage.local.get(null);
  } catch (e) {
    console.log('error getting from storage', e);
    return null;
  }
}

export async function getFromStorage(key) {
  try {
    const data = await browser.storage.local.get({ [key]: [] });
    return data[key] || [];
  } catch (e) {
    console.log('error getting from storage', e);
    return [];
  }
}
export async function setToStorage(key, value) {
  try {
    await browser.storage.local.set({ [key]: value });
    return true;
  } catch (e) {
    console.log('error setting from storage', e);
    return null;
  }
}

export async function clearStorage() {
  try {
    await browser.storage.local.clear();
    return true;
  } catch (e) {
    console.log('error clearing storage', e);
    return null;
  }
}


export function prettyJson(data, ignoreKeys = [], indentLevel = 0) {
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
					}
					catch (e) { }
				}
			}

			prettyOpts += `${indent}${key}: ${val}\n`;
		}
	}

	return prettyOpts.trim();
}