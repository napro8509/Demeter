import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Flex from '@components/Flex';
import { Colors } from '@assets';
import useHeader from '@hooks/useHeader';
import { Button } from '@components';
import { DISABLED } from '@constants';
import SmartConfig from 'react-native-smartconfig-quan';
import { Crypto } from '@utils';
import RegisterDeviceHelper from './helper/RegisterDeviceHelper';
import { useCreateDeviceMutation } from '@graphql/generated/graphql';

const wifiBssid = '8a:29:9c:69:af:9b';

const RegisterDevice = ({ navigation, route }) => {
	const { wifiName, password } = route?.params || {};
	const [log, setLog] = useState('log here');
	const [deviceIp, setDeviceIp] = useState('');
	const ip = useRef();
	useHeader(navigation);
	const [createDevice, { loading }] = useCreateDeviceMutation();
	useEffect(() => {
		startBroadcast();
		// setTimeout(() => {
		// 	setDeviceIp('10.67.3.26');
		// 	const data = Crypto.decryptAES(
		// 		'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',
		// 		'demetersecr3t'
		// 	);
		// 	console.log(data);
		// }, 3000);
	}, []);

	const handleCreateDeviceCompleted = data => {
		if (data?.createDevice) {
			const { keyAndCerts } = data?.createDevice || {};
			const decryptedData = Crypto.decryptAES(keyAndCerts, 'demetersecr3t');
			console.log(decryptedData);
			getInfo();
		}
	};

	const getInfo = () => {
		RegisterDeviceHelper.getDeviceInfo(ip.current).then(data => console.log(data));
	};

	const startBroadcast = () => {
		RegisterDeviceHelper.startSmartConfig({ wifiName, password })
			.then(data => {
				if (Array.isArray(data) && data?.length > 0) {
					const { ipv4 } = data?.[0] || {};
					setDeviceIp(ipv4);
					ip.current = ipv4;
					createDevice({
						variables: {
							input: {
								deviceProfileId: '6229b007e029a812bac5d0fc',
								deviceSerial: 'DMT_ESOC_1576480',
							},
						},
						onCompleted: handleCreateDeviceCompleted,
					});
				}
			})
			.catch(err => console.log(err));
	};

	return (
		<Flex style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Bring device closer to router</Text>
				<View style={styles.loadingBlock}>
					<ActivityIndicator color={Colors.green} />
					<View style={styles.infoBlock}>
						<Text style={styles.infoText}>{log}</Text>
						<Text style={styles.infoText}>Device connected</Text>
						<Text style={styles.infoText}>Message sent to device</Text>
						<Text style={styles.infoText}>Connecting device to network</Text>
					</View>
				</View>
			</View>
			<Button title='Finalize' />
		</Flex>
	);
};

export default RegisterDevice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: 20,
		paddingBottom: 48,
	},
	wrapper: {
		flex: 1,
		justifyContent: 'center',
	},
	title: {
		fontSize: 21,
		color: Colors.green,
		textAlign: 'center',
	},
	loadingBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
	},
	infoText: {
		fontSize: 15,
		color: Colors.black,
	},
	infoBlock: {
		marginLeft: 16,
	},
});
