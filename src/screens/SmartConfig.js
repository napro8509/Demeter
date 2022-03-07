import { Colors } from '@assets';
import { Flex } from 'native-base';
import React, { useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import RNEsptouch from 'react-native-esptouch';
import WifiManager from 'react-native-wifi-reborn';
const SmartConfig = () => {
	useEffect(() => {
		RNEsptouch.initESPTouch();
		setTimeout(() => {
			WifiManager.getCurrentWifiSSID().then(
				ssid => {
					console.log('Your current connected wifi SSID is ' + ssid);
				},
				() => {
					console.log('Cannot get current SSID!');
				}
			);
		}, 3000);

		return () => {
			RNEsptouch.finish();
		};
	}, []);

	const handleStart = () => {
		let connected_wifi_password = 'agritech';
		let broadcast_type = 1; // 1: broadcast;	0: multicast
		RNEsptouch.startSmartConfig(connected_wifi_password, broadcast_type).then(res => {
			if (res.code == 200) {
				// ESPTouch success
				console.log(res);
				alert('ESPTouch SUCCESS');
				RNEsptouch.getNetInfo().then(info => {
					console.log(info);
					// { ssid, bssid }
				});
			} else {
				// ESPTouch failed
				alert('ESPTouch FAILED');
				console.info(res.msg);
			}
		});
	};

	return (
		<Flex style={styles.container}>
			<Button title='ESPTouch Start' onPress={handleStart} />
		</Flex>
	);
};

export default SmartConfig;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
});
