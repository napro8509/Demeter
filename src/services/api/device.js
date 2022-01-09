import { get, post } from './request';

const getInfo = () =>
	fetch('http://192.168.4.1/info', {
		method: 'GET',
		headers: {},
	})
		.then(data => {
			alert(JSON.stringify(data))
			return data.json();
		})
		.then(data => {
			alert(JSON.stringify(data));
		})
		.catch(err => console.error(err));

const scanAp = () =>
	fetch('http://192.168.4.1/cmd/scanap', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(data => data.json())
		.then(data => alert(JSON.stringify(data)))
		.catch(err => alert(JSON.stringify(err)));

const getListAp = () =>
	fetch('http://192.168.4.1/cmd/getap', {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	})
		.then(data => data.json())
		.then(data => alert(JSON.stringify(data)))
		.catch(err => alert(JSON.stringify(err)));

const connectAp = () =>
	fetch('http://192.168.4.1/cmd/connectap', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			ssid: 'FOODMAP.ASIA',
			password: 'agritech',
		}),
	})
		.then(data => data.json())
		.then(data => alert(JSON.stringify(data)))
		.catch(err => alert(JSON.stringify(err)));

export default {
	getInfo,
	scanAp,
	getListAp,
	connectAp,
};
