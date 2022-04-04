const fetch = require('node-fetch');
// const getDeviceInfo = ip => {
// 	console.log(`http://${ip}/api/params/cert/detail`);
// 	return fetch(`http://${ip}/api/params/cert/detail`, {
// 		method: 'GET',
// 		headers: {},
// 	})
// 		.then(data => data.json())
// 		.then(data => console.log(JSON.stringify(data, null, 2)))
// 		.catch(err => console.error(err));
// };

// const getDeviceInfo = ip => {
// 	console.log(`http://${ip}/api/info`);
// 	return fetch(`http://${ip}/api/info`, {
// 		method: 'GET',
// 		headers: {},
// 	})
// 		.then(data => data.json())
// 		.then(data => console.log(JSON.stringify(data, null, 2)))
// 		.catch(err => console.error(err));
// };

// const timeout = () => {
// 	return new Promise(resolve => {
// 		setTimeout(() => {
// 			resolve();
// 		}, 3000);
// 	});
// };

// getDeviceInfo('10.67.3.164')
// 	.then(() => timeout())
// 	.then(() => getDeviceInfo('10.67.3.164'))
// 	.then(() => console.log('done'));
