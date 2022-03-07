/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

JSON.parseSafe = data => {
	try {
		return JSON.parse(data);
	} catch (err) {
		return undefined;
	}
};

AppRegistry.registerComponent(appName, () => App);
