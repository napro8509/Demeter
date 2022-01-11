import { Flex } from 'native-base';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import useHeader from '../hooks/useHeader';

const RegisterSuccess = ({ navigation }) => {
	useHeader(navigation);

	const handleLogin = () => {
		navigation.popToTop();
		setTimeout(() => {
			navigation.navigate('LoginAccount');
		}, 500);
	};

	return (
		<Flex style={styles.container} keyboardAvoidView>
			<View style={styles.wrapper}>
				<Image source={Images.img_logo} style={styles.logo} />
				<Text style={styles.loginText}>Congratulation</Text>
				<Text style={styles.description}>
					Now you could log in to your account and experience Demeter.
				</Text>
			</View>
			<Button title='Log in' onPress={handleLogin} />
		</Flex>
	);
};

export default RegisterSuccess;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingBottom: 16,
		paddingHorizontal: 20,
	},
	description: {
		color: Colors.darkGray,
		fontSize: 16,
		marginTop: 6,
		textAlign: 'center',
	},
	loginText: {
		color: Colors.black,
		fontSize: 28,
		fontWeight: '700',
		marginTop: 40,
		textAlign: 'center',
	},
	logo: {
		alignSelf: 'center',
		height: 110,
		marginTop: 80,
		width: 110,
	},
	wrapper: {
		flex: 1,
	},
});
