import React, { useEffect } from 'react';
import { Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/colors';
import Images from '../assets/images';
import Button from '../components/Button';
import Flex from '../components/Flex';
import HTMLText from '../components/HTMLText';
import { LIGHT, PRIMARY } from '../constants';
import { appleAuth } from '@invertase/react-native-apple-authentication';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AccessToken, LoginManager, Profile } from 'react-native-fbsdk-next';
import { AuthApi } from '../services/api';

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

	const handleLoginSocialSuccess = data => {
		const { accessToken } = data?.loginSocial || {};
		if (accessToken) {
			navigation.navigate('MainStack');
			StatusBar.setBarStyle('dark-content');
		}
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

	const onGoogleButtonPress = async () => {
		try {
			await GoogleSignin.configure({
				webClientId:
					'943234074628-bcog17h3tv44jcolsve29qh44vame35k.apps.googleusercontent.com',
			});
			await GoogleSignin.hasPlayServices();
			const userInfo = await GoogleSignin.signIn();
			console.log(userInfo);
			AuthApi.loginSocial({
				accessToken: userInfo.idToken,
				email: userInfo.user.email,
				firstName: userInfo.user.familyName,
				lastName: userInfo.user.givenName,
				provider: 'google',
				socialId: userInfo.user.id,
			})
				.then(handleLoginSocialSuccess)
				.catch(err => console.log(err));
		} catch (err) {
			console.log(err);
		}
	};

	const onFacebookButtonPress = () => {
		LoginManager.logInWithPermissions(['public_profile', 'email']).then(
			function (result) {
				if (result.isCancelled) {
					console.log('Login cancelled');
				} else {
					console.log(
						'Login success with permissions: ' + result.grantedPermissions.toString()
					);
					console.log(result);
					AccessToken.getCurrentAccessToken().then(data => {
						console.log(data);
						Profile.getCurrentProfile().then(function (currentProfile) {
							console.log('currentProfile', currentProfile);
							if (currentProfile) {
								AuthApi.loginSocial({
									accessToken: data.accessToken,
									email: currentProfile.email || '',
									firstName: currentProfile.firstName,
									lastName: currentProfile.lastName,
									provider: 'facebook',
									socialId: currentProfile.userID,
								})
									.then(handleLoginSocialSuccess)
									.catch(err => console.log(err));
							}
						});
					});
				}
			},
			function (error) {
				console.log('Login fail with error: ' + error);
			}
		);
	};

	const isIOS = Platform.OS === 'ios';

	return (
		<Flex style={styles.container} backgroundColor={Colors.dartBackground}>
			<View style={styles.logoContainer}>
				<Image source={Images.img_logo} style={styles.logo} />
			</View>
			<View style={styles.body}>
				{isIOS && (
					<Button
						title='Continue with Apple'
						type={LIGHT}
						icon={Images.ic_apple}
						onPress={onAppleButtonPress}
					/>
				)}
				<Button
					title='Continue with Google'
					type={LIGHT}
					icon={Images.ic_google}
					style={styles.button}
					onPress={onGoogleButtonPress}
				/>
				<Button
					title='Continue with Facebook'
					type={LIGHT}
					icon={Images.ic_facebook}
					style={styles.button}
					onPress={onFacebookButtonPress}
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
