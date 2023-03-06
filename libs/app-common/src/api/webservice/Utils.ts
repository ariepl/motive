function encodeUrlParamsEncoder(formBody: any, payload: any, prefix = '') {
	for (const property of Object.keys(payload)) {
		let encodedKey = encodeURIComponent(property);
		if (prefix) {
			encodedKey = prefix + '[' + encodedKey + ']';
		}

		// null is also an object
		const value = payload[property];
		if (value === null) {
			formBody.push(encodedKey + '=');
		} else if (typeof value === 'object') {
			encodeUrlParamsEncoder(formBody, value, encodedKey);
		} else if (typeof value === 'boolean') {
			formBody.push(encodedKey + '=' + +value);
		} else if (value != undefined) {
			const encodedValue = encodeURIComponent(value);
			formBody.push(encodedKey + '=' + encodedValue);
		}
	}
}

export function encodeUrlParams(payload: any) {
	const formBody = [];

	encodeUrlParamsEncoder(formBody, payload);

	return formBody.join('&');
}

function encodeParamsToFormDataEncoder(formData: FormData, payload: object, prefix = '') {
	for (const property of Object.keys(payload)) {
		let encodedKey = encodeURIComponent(property);
		if (prefix) {
			encodedKey = prefix + '[' + encodedKey + ']';
		}

		const value = payload[property];
		if (value instanceof File) {
			formData.append(encodedKey, value);
		}
		// null is also an object
		else if (value === null) {
			formData.append(encodedKey, String(null));
		} else if (typeof value === 'object') {
			encodeParamsToFormDataEncoder(formData, value, encodedKey);
		} else if (typeof value === 'boolean') {
			formData.append(encodedKey, String(+value));
		} else if (value != undefined) {
			formData.append(encodedKey, value);
		}
	}
}

export function encodeParamsToFormData(payload) {
	const formData = new FormData();

	encodeParamsToFormDataEncoder(formData, payload);

	return formData;
}
