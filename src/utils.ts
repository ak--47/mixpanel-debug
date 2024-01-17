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


export function getTestData(){
	return [{"token":"651a6f7016b5f4da03ebca5e12098489","from":["http://localhost:3000"],"stream":[{"$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$distinct_id":"whuuuuuut","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$name":"foo","$os":"Mac OS X","bar":"baz"},"$token":"651a6f7016b5f4da03ebca5e12098489","$user_id":"whuuuuuut"},{"event":"don't click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"ndwfto16kmnkrnx0","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821497.24,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"event":"click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"9vszwemm4oa7b3n9","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821496.957,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"event":"don't click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"l2zottaf74sbhsgh","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821496.675,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"event":"don't click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"hn9gder32sytu6a1","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821496.374,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$distinct_id":"whuuuuuut","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$name":"foo","$os":"Mac OS X","bar":"baz"},"$token":"651a6f7016b5f4da03ebca5e12098489","$user_id":"whuuuuuut"},{"$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$distinct_id":"whuuuuuut","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$name":"foo","$os":"Mac OS X","bar":"baz"},"$token":"651a6f7016b5f4da03ebca5e12098489","$user_id":"whuuuuuut"},{"$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$distinct_id":"whuuuuuut","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$name":"foo","$os":"Mac OS X","bar":"baz"},"$token":"651a6f7016b5f4da03ebca5e12098489","$user_id":"whuuuuuut"},{"event":"don't click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"ppjslogzn1j8z74g","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821494.75,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"event":"click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"k36nauyochcbsqa3","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697821494.465,"token":"651a6f7016b5f4da03ebca5e12098489"}},{"event":"click me button","properties":{"$browser_version":118,"$current_url":"http://localhost:3000/","$device_id":"18b3b6362f3b2-083ef01abede78-17525634-1fa400-18b3b6362f3b2","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"ycqzzddiax0h6hiw","$lib_version":"2.47.0","$os":"Mac OS X","$screen_height":1080,"$screen_width":1920,"$user_id":"whuuuuuut","distinct_id":"whuuuuuut","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","time":1697817279.652,"token":"651a6f7016b5f4da03ebca5e12098489"}}]},{"token":"8fd4f3f730128a593ab8aa2dddd0c153","from":["https://jewishhelpinghands.org"],"stream":[{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153","$union":{"IPs":["68.142.55.60"]}},{"$add":{"num of pages":1},"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set_once":{"$created":"2023-10-20T17:05:55.242Z"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$latitude":44.3371,"$longitude":-73.0918,"$os":"Mac OS X","Organization":"GMA","zip code":"05461"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"event":"page exit","properties":{"$browser":"Chrome","$browser_version":118,"$current_url":"https://jewishhelpinghands.org/projects","$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$duration":1.5,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"s11hghtmwid60m6g","$latitude":44.3371,"$lib_version":"2.47.0","$longitude":-73.0918,"$os":"Mac OS X","$referrer":"https://jewishhelpinghands.org/project-selection","$referring_domain":"jewishhelpinghands.org","$screen_height":1080,"$screen_width":1920,"IP Address":"68.142.55.60","Organization":"GMA","distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","hash":"","last event time (epoch)":1697821556523,"last event time (pretty)":"2023-10-20T17:05:56.523Z","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","page title":"Projects — Jewish Helping Hands","session ID":"055a95da-4837-4685-bbd9-1650efe3a76c","time":1697821556.525,"token":"8fd4f3f730128a593ab8aa2dddd0c153","url":"/projects","zip code":"05461"}},{"event":"$identify","properties":{"$anon_distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$browser":"Chrome","$browser_version":118,"$current_url":"https://jewishhelpinghands.org/projects","$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"k8sq66m9fp9ktxij","$latitude":44.3371,"$lib_version":"2.47.0","$longitude":-73.0918,"$os":"Mac OS X","$referrer":"https://jewishhelpinghands.org/project-selection","$referring_domain":"jewishhelpinghands.org","$screen_height":1080,"$screen_width":1920,"IP Address":"68.142.55.60","Organization":"GMA","distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","last event time (epoch)":1697821555240,"last event time (pretty)":"2023-10-20T17:05:55.240Z","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","session ID":"055a95da-4837-4685-bbd9-1650efe3a76c","time":1697821555.245,"token":"8fd4f3f730128a593ab8aa2dddd0c153","zip code":"05461"}},{"event":"page enter","properties":{"$browser":"Chrome","$browser_version":118,"$current_url":"https://jewishhelpinghands.org/projects","$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"ppa4er6r6l4r8ek5","$latitude":44.3371,"$lib_version":"2.47.0","$longitude":-73.0918,"$os":"Mac OS X","$referrer":"https://jewishhelpinghands.org/project-selection","$referring_domain":"jewishhelpinghands.org","$screen_height":1080,"$screen_width":1920,"IP Address":"68.142.55.60","Organization":"GMA","distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","hash":"","last event time (epoch)":1697821555240,"last event time (pretty)":"2023-10-20T17:05:55.240Z","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","page title":"Projects — Jewish Helping Hands","session ID":"055a95da-4837-4685-bbd9-1650efe3a76c","time":1697821555.241,"token":"8fd4f3f730128a593ab8aa2dddd0c153","url":"/projects","zip code":"05461"}},{"event":"page exit","properties":{"$browser":"Chrome","$browser_version":118,"$current_url":"https://jewishhelpinghands.org/project-selection","$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$duration":5.432,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$insert_id":"ugetuu5lq5poe8jh","$latitude":44.3371,"$lib_version":"2.47.0","$longitude":-73.0918,"$os":"Mac OS X","$referrer":"https://jewishhelpinghands.org/about","$referring_domain":"jewishhelpinghands.org","$screen_height":1080,"$screen_width":1920,"IP Address":"68.142.55.60","Organization":"GMA","distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","hash":"","last event time (epoch)":1697821554659,"last event time (pretty)":"2023-10-20T17:05:54.659Z","mp_lib":"web","mp_sent_by_lib_version":"2.47.0","page title":"Project Selection — Jewish Helping Hands","session ID":"055a95da-4837-4685-bbd9-1650efe3a76c","time":1697821554.661,"token":"8fd4f3f730128a593ab8aa2dddd0c153","url":"/project-selection","zip code":"05461"}},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153","$union":{"IPs":["68.142.55.60"]}},{"$add":{"num of pages":1},"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set_once":{"$created":"2023-10-20T17:05:57.126Z"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$latitude":44.3371,"$longitude":-73.0918,"$os":"Mac OS X","Organization":"GMA","zip code":"05461"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153","$union":{"IPs":["68.142.55.60"]}},{"$add":{"num of pages":1},"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set_once":{"$created":"2023-10-20T17:05:49.469Z"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$latitude":44.3371,"$longitude":-73.0918,"$os":"Mac OS X","Organization":"GMA","zip code":"05461"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153","$union":{"IPs":["68.142.55.60"]}},{"$add":{"num of pages":1},"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set_once":{"$created":"2023-10-20T17:05:42.311Z"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$latitude":44.3371,"$longitude":-73.0918,"$os":"Mac OS X","Organization":"GMA","zip code":"05461"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153","$union":{"IPs":["68.142.55.60"],"all session IDs":["055a95da-4837-4685-bbd9-1650efe3a76c"]}},{"$add":{"num of pages":1,"num of sessions":1},"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set_once":{"$created":"2023-10-20T17:05:34.260Z"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"},{"$device_id":"18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$distinct_id":"$device:18b4e0ca3e2427-0b87eda4203b97-17525634-1fa400-18b4e0ca3e2427","$set":{"$browser":"Chrome","$browser_version":118,"$initial_referrer":"$direct","$initial_referring_domain":"$direct","$latitude":44.3371,"$longitude":-73.0918,"$os":"Mac OS X","Organization":"GMA","zip code":"05461"},"$token":"8fd4f3f730128a593ab8aa2dddd0c153"}]}]
}