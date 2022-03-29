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
		setTimeout(() => {
			setDeviceIp('10.67.3.26');
			const data = Crypto.decryptAES(
				'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',
				'demetersecr3t'
			);
			console.log(data);
		}, 3000);
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
