// import SmartConfig from 'react-native-smartconfig-quan';
// import Smartconfig from 'react-native-smartconfig';
import SmartConfigP from 'react-native-smart-config-p';
const wifiBssid = 'b0:a7:b9:89:a2:f6';

const startSmartConfig = ({ wifiName, password }) => {
	return new Promise((resolve, reject) => {
		SmartConfigP.start({
			ssid: wifiName,
			password: password,
			bssid: wifiBssid, // Mac address of Mobile
			count: 1, //Number Esp
			cast: 'broadcast', // boardcast or multicast
		})
			.then(function (results) {
				console.log(results);
				if (results?.[0]) {
					resolve(results?.[0]);
				}
			})
			.catch(err => console.log(err));
	});
};

const getDeviceInfo = ip => {
	console.log(`http://${ip}/info`);
	return fetch(`http://${ip}/api/info`, {
		method: 'GET',
		headers: {},
	})
		.then(data => {
			return data.json();
		})
		.catch(err => console.log(err));
};

const setParams = (ip = '', params = {}) => {
	console.log(`http://${ip}/api/params`);
	return fetch(`http://${ip}/api/params`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(params),
	})
		.then(data => {
			return data.json();
		})
		.then(response => {
			console.log(response);
			return response;
		})
		.catch(err => console.log(err));
};

const connectMQTT = ip => {
	console.log(`http://${ip}/api/cmd/connect/mqtt`);

	return fetch(`http://${ip}/api/cmd/connect/mqtt`, {
		method: 'GET',
		headers: {},
	})
		.then(data => {
			return data.json();
		})
		.catch(err => console.log(err));
};

export default {
	startSmartConfig,
	getDeviceInfo,
	setParams,
	connectMQTT,
};
