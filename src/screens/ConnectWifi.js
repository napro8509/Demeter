import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Flex from '@components/Flex';
import { Colors } from '@assets';
import useHeader from '@hooks/useHeader';
import WifiManager from 'react-native-wifi-reborn';
import ConnectWifiPopup from '../popup/ConnectWifiPopup';
import { AppNavigator } from '@navigation';

const ConnectWifi = ({ navigation }) => {
	useHeader(navigation);
	const [currentSSID, setCurrentSSID] = useState('');
	useEffect(() => {
		WifiManager.getCurrentWifiSSID()
			.then(data => {
				setCurrentSSID(data);
			})
			.catch(err => console.log(err));
	}, []);

	const handleRetry = () => {};

	const handleInputPassword = password => {
		navigation.navigate('RegisterDevice', {
			wifiName: currentSSID,
			password,
		});
	};

	const handleSmartConfig = () => {
		AppNavigator.showBottom({
			screen: ConnectWifiPopup,
			params: {
				onInputPassword: handleInputPassword,
				currentSSID,
			},
		});
	};

	return (
		<Flex style={styles.container}>
			<View style={styles.body}>{}</View>
			<TouchableOpacity onPress={handleRetry}>
				<Text style={styles.tryAgainText}>Try Again</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={handleSmartConfig}>
				<Text style={styles.tryAgainText2}>Or use WiFi SmartConfig</Text>
			</TouchableOpacity>
		</Flex>
	);
};

export default ConnectWifi;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	body: {
		flex: 1,
	},
	tryAgainText: {
		fontSize: 16,
		color: Colors.green,
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 30,
	},
	tryAgainText2: {
		fontSize: 16,
		color: Colors.green,
		fontWeight: '500',
		textAlign: 'center',
		marginBottom: 30,
	},
});
