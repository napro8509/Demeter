import { ASYNC_AUTH_TOKEN } from '@constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const validateEmail = email => {
	if (email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		return true;
	}
	return false;
};

const getToken = async () => {
	const token = await AsyncStorage.getItem(ASYNC_AUTH_TOKEN);
	return token;
};

const uploadFile = async ({ fileUri, fileType, fileName }) => {
	let data = new FormData();
	data.append(
		'operations',
		`{ "query": "mutation ($image: Upload!) { uploadImage(image: $image) { creatorId url } }", "variables": { "image": null } }`
	);
	data.append('map', `{ "0": ["variables.image"] }`);
	data.append('0', { uri: fileUri, type: fileType, name: fileName });
	const token = await getToken();
	try {
		const response = await fetch('https://stag-api.demeter.vn/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token,
			},
			body: data,
		});
		const responseData = await response.json();
		return responseData?.data?.uploadImage?.url;
	} catch (error) {
		console.log(error);
		return null;
	}
};

const sendFile = async ({ fileUri, fileType, fileName }) => {
	let data = new FormData();
	data.append(
		'operations',
		`{ "query": "mutation ($image: Upload!) { uploadImage(image: $image) { creatorId url } }", "variables": { "image": null } }`
	);
	data.append('map', `{ "0": ["variables.image"] }`);
	data.append('0', { uri: fileUri, type: fileType, name: fileName });
	const token = await getToken();
	try {
		const response = await fetch('https://stag-api.demeter.vn/graphql', {
			method: 'POST',
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: 'Bearer ' + token,
			},
			body: data,
		});
		const responseData = await response.json();
		return responseData?.data?.uploadImage?.url;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export default { validateEmail, uploadFile };
