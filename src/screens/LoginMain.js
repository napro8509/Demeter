import React, { useEffect } from 'react';
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/colors';
import Images from '../assets/images';
import Button from '../components/Button';
import Flex from '../components/Flex';
import HTMLText from '../components/HTMLText';
import { LIGHT, PRIMARY } from '../constants';
import { appleAuth } from '@invertase/react-native-apple-authentication';
const Terms = `By joining Demeter, you agree to our <highlight>Terms of Service</highlight> and <highlight>Privacy Policy</highlight>`;

const LoginMain = ({ navigation }) => {
	useEffect(() => {
		StatusBar.setBarStyle('light-content');
	}, []);

	const handleLoginAccount = () => {
		navigation.navigate('LoginAccount');
		StatusBar.setBarStyle('dark-content');
	};

	const handleRegisterAccount = () => {
		StatusBar.setBarStyle('dark-content');
		navigation.navigate('RegisterScreen');
	};

	async function onAppleButtonPress() {
		// performs login request
		try {
			const appleAuthRequestResponse = await appleAuth.performRequest({
				requestedOperation: appleAuth.Operation.LOGIN,
				requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
			});

			// get current authentication state for user
			// /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
			const credentialState = await appleAuth.getCredentialStateForUser(
				appleAuthRequestResponse.user
			);

			// use credentialState response to ensure the user is authenticated
			if (credentialState === appleAuth.State.AUTHORIZED) {
				// user is authenticated
			}
		} catch (err) {
			alert(err);
		}
	}

	return (
		<Flex style={styles.container} backgroundColor={Colors.dartBackground}>
			<View style={styles.logoContainer}>
				<Image source={Images.img_logo} style={styles.logo} />
			</View>
			<View style={styles.body}>
				<Button
					title='Continue with Apple'
					type={LIGHT}
					icon={Images.ic_apple}
					onPress={onAppleButtonPress}
				/>
				<Button
					title='Continue with Google'
					type={LIGHT}
					icon={Images.ic_google}
					style={styles.button}
				/>
				<Button
					title='Continue with Facebook'
					type={LIGHT}
					icon={Images.ic_facebook}
					style={styles.button}
				/>
				<View style={styles.separator}>
					<View style={styles.line} />
					<Text style={styles.or}>Or</Text>
					<View style={styles.line} />
				</View>
				<Button
					title='Create account'
					type={PRIMARY}
					style={styles.button}
					onPress={handleRegisterAccount}
				/>
				<HTMLText
					children={Terms}
					style={{ div: styles.term }}
					containerStyle={styles.termContainer}
				/>
				<View style={styles.loginContainer}>
					<Text style={styles.hasAccount}>Already have an account?</Text>
					<TouchableOpacity onPress={handleLoginAccount}>
						<Text style={styles.login}> Log in</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Flex>
	);
};

export default LoginMain;

const styles = StyleSheet.create({
	body: {
		paddingHorizontal: 30,
	},
	button: {
		marginTop: 10,
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	hasAccount: {
		color: Colors.white,
		fontSize: 16,
	},
	line: {
		backgroundColor: Colors.white,
		flex: 1,
		height: 1,
	},
	login: {
		color: Colors.green,
		fontSize: 16,
	},
	loginContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 40,
	},
	logo: {
		alignSelf: 'center',
		height: 200,
		width: 200,
	},
	logoContainer: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	or: {
		color: Colors.white,
		fontSize: 14,
		marginHorizontal: 10,
	},
	separator: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 10,
	},
	term: {
		color: Colors.white,
		textAlign: 'center',
	},
	termContainer: {
		marginTop: 20,
	},
});
