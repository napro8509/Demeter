import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Flex from '@components/Flex';
import { Colors } from '@assets';
import useHeader from '@hooks/useHeader';
import { Button } from '@components';
import { DISABLED } from '@constants';

const RegisterDevice = ({ navigation }) => {
	useHeader(navigation);

	return (
		<Flex style={styles.container}>
			<View style={styles.wrapper}>
				<Text style={styles.title}>Bring device closer to router</Text>
				<View style={styles.loadingBlock}>
					<ActivityIndicator color={Colors.green} />
					<View style={styles.infoBlock}>
						<Text style={styles.infoText}>Device connected</Text>
						<Text>Message sent to device</Text>
						<Text>Connecting device to network</Text>
					</View>
				</View>
			</View>
			<Button title='Finalize' type={DISABLED} />
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
