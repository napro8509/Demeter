import SmartConfig from 'react-native-smartconfig-quan';
const wifiBssid = '8a:29:9c:69:af:9b';

const startSmartConfig = ({ wifiName, password }) => {
	const TIME_OUT_SMART_CONFIG = 30 * 1000; // 30s
	let foundDevice = false;
	return new Promise((resolve, reject) => {
		SmartConfig.start(wifiName, wifiBssid, password, TIME_OUT_SMART_CONFIG, event => {
			console.log(event);
			let { eventName, data } = event;
			if (eventName === 'onFoundDevice') {
				foundDevice = true;
				data = JSON.parse(data);
				resolve(data);
				// data in event is ip of ESP
				console.log('Found device\nip: ' + data.ip + '\nbssid: ' + data.bssid);
			} else {
				if (!foundDevice) {
					reject('Not found');
					console.log('Not found');
				}
			}
		});
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
		.catch(err => console.error(err));
};

const setParams = (ip, params = {}) => {
	console.log(`http://${ip}/api/params`);
	return fetch(`http://${ip}/api/params`, {
		method: 'POST',
		headers: {},
		body: JSON.stringify(params),
	})
		.then(data => {
			return data.json();
		})
		.catch(err => console.error(err));
};

const connectMQTT = ip => {
	console.log(`http://${ip}/api/cmd/connect/mqtt`);

	return fetch('http://${ip}/api/cmd/connect/mqtt', {
		method: 'GET',
		headers: {},
	})
		.then(data => {
			return data.json();
		})
		.catch(err => console.error(err));
};

export default {
	startSmartConfig,
	getDeviceInfo,
	setParams,
	connectMQTT,
};
