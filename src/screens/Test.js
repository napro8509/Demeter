/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useState } from 'react';
import {
	Button,
	PermissionsAndroid,
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	useColorScheme,
} from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title, isSelected, onSelectWifi }) => {
	const isDarkMode = useColorScheme() === 'dark';

	return (
		<TouchableOpacity style={styles.sectionContainer(isSelected)} onPress={onSelectWifi}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: isDarkMode ? Colors.white : Colors.black,
					},
				]}
			>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

const Test = ({ navigation }) => {
	const isDarkMode = useColorScheme() === 'dark';

	const [selectedWifi, setSelectedWifi] = useState('');
	const [password, setPassword] = useState('');
	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	const [wifiList, setWifiList] = useState([]);

	const grantPermission = async () => {
		const granted = await PermissionsAndroid.request(
			PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
			{
				title: 'Location permission is required for WiFi connections',
				message:
					'This app needs location permission as this is required  ' +
					'to scan for wifi networks.',
				buttonNegative: 'DENY',
				buttonPositive: 'ALLOW',
			}
		);
		console.log(granted);
		if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			// You can now use react-native-wifi-reborn
			WifiManager.loadWifiList()
				.then(data => {
					if (Array.isArray(data) && data.length > 0) {
						setWifiList(data);
					}
				})
				.catch(err => console.log(err));
		} else {
			// Permission denied
			console.log('DENY');
		}
	};

	const handleConnectWifi = () => {
		WifiManager.connectToProtectedSSID(selectedWifi, password, false).then(
			response => {
				alert('Connected successfully!');
			},
			() => {
				alert('Connection failed!');
			}
		);
	};

	const handleRequest = () => {
		navigation.navigate('RequestScreen');
	};

	const handleESPTouch = () => {
		navigation.navigate('SmartConfig');
	};

	useEffect(() => {
		grantPermission();
	}, []);

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
			<ScrollView contentInsetAdjustmentBehavior='automatic' style={backgroundStyle}>
				{wifiList.map(item => (
					<Section
						key={item?.SSID}
						title={item?.SSID}
						isSelected={item?.SSID === selectedWifi}
						onSelectWifi={() => setSelectedWifi(item?.SSID)}
					/>
				))}
				<TextInput style={styles.input} onChangeText={setPassword} value={password} />
				<Button title='Connect Wifi' onPress={handleConnectWifi} />
				<Button title='Request' onPress={handleRequest} />
				<Button title='ESPTouch' onPress={handleESPTouch} />
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	input: {
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 20,
		marginVertical: 16,
	},
	sectionContainer: isSelected => ({
		paddingHorizontal: 24,
		backgroundColor: isSelected ? 'blue' : 'black',
		justifyContent: 'center',
		paddingVertical: 20,
	}),
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
});

export default Test;
