/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native';
import { name as appName } from './app.json';
import App from './src/App';

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

JSON.parseSafe = data => {
	try {
		return JSON.parse(data);
	} catch (err) {
		return undefined;
	}
};

AppRegistry.registerComponent(appName, () => App);
