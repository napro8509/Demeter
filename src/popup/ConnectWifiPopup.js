import { Colors, Images } from '@assets';
import Input from '@components/Input';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ConnectWifiPopup = ({ requestClose, params }) => {
	const { onInputPassword, currentSSID } = params || {};

	const [password, setPassword] = useState('');

	const handleJoin = () => {
		onInputPassword?.(password);
		requestClose?.();
	};

	return (
		<View style={styles.popupContainer}>
			<View style={styles.header}>
				<TouchableOpacity onPress={requestClose}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
				<Text style={styles.name}>{currentSSID}</Text>
				<TouchableOpacity onPress={handleJoin}>
					<Text style={styles.join(password?.length > 5)}>Join</Text>
				</TouchableOpacity>
			</View>
			<Input
				containerStyle={styles.inputStyle}
				placeholder='Password'
				leftIcon={Images.ic_lock}
				onChangeText={setPassword}
				defaultValue={password}
				secureTextEntry
			/>
		</View>
	);
};

export default ConnectWifiPopup;

const styles = StyleSheet.create({
	popupContainer: {
		padding: 20,
		borderTopRightRadius: 12,
		borderTopLeftRadius: 12,
		backgroundColor: Colors.white,
		width: '100%',
		paddingBottom: 48,
	},
	inputStyle: {
		marginTop: 24,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	cancelText: {
		fontSize: 16,
		color: Colors.green,
	},
	name: {
		fontSize: 18,
		color: Colors.black,
		flex: 1,
		textAlign: 'center',
	},
	join: isActive => ({
		fontSize: 16,
		color: isActive ? Colors.green : Colors.lightGray,
	}),
});
