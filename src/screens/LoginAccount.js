import React, { memo, useEffect } from 'react';
import { createRef } from 'react';
import { useState } from 'react';
import {
	Image,
	Keyboard,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Popover, { usePopover } from 'react-native-modal-popover';
import Colors from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import Input from '../components/Input';
import { AuthApi } from '../services/api';
import useSelector from '../context/useSelector';
import useDispatch from '../context/useDispatch';
import { LOGIN_SUCCESS } from '../context/actions/types';
import { useStateCallback } from 'react-native-component-kits';
import useHeader from '../hooks/useHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ASYNC_AUTH_TOKEN } from '../constants';

const LoginAccount = ({ navigation }) => {
	useHeader(navigation);
	const [username, setUserName] = useState('123445@gmail.com');
	const [password, setPassword] = useState('0989222333');
	const [errorMessage, setErrorMessage] = useStateCallback('');
	const { openPopover, closePopover, popoverVisible, touchableRef, popoverAnchorRect } =
		usePopover();
	const scrollRef = createRef();
	const userNameRef = createRef();
	const passWordRef = createRef();

	const dispatch = useDispatch('dispatchMiddleWare');
	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', handleScrollEnd);
		touchableRef.current = userNameRef.current;
	}, []);

	const handleScrollEnd = () => {
		scrollRef?.current?.scrollToEnd?.();
	};
	const handleLoginAccount = () => {
		navigation.navigate('RegisterScreen');
	};

	const handleLogin = () => {
		Keyboard.dismiss();
		touchableRef.current = passWordRef.current;
		AuthApi.login(username, password)
			.then(data => {
				if (data?.login?.accessToken) {
					dispatch({
						type: LOGIN_SUCCESS,
						payload: {
							accessToken: data?.login?.accessToken,
						},
					});
					AsyncStorage.setItem(ASYNC_AUTH_TOKEN, data?.login?.accessToken);
					navigation.navigate('MainStack');
				}
			})
			.catch(err => {
				console.log(err);
				if (errorMessage === err?.errorMessage) {
					openPopover?.();
				} else {
					setErrorMessage(err?.errorMessage, () => {
						openPopover?.();
					});
				}
			});
	};

	return (
		<Flex style={styles.container} keyboardAvoidView>
			<ScrollView ref={scrollRef} style={styles.flex1} showsVerticalScrollIndicator={false}>
				<Image source={Images.img_logo} style={styles.logo} />
				<Text style={styles.loginText}>Welcome back</Text>
				<View ref={userNameRef}>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Phone number or email address'
						leftIcon={Images.ic_user}
						onChangeText={setUserName}
						defaultValue={username}
					/>
				</View>
				<View ref={passWordRef}>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Password'
						leftIcon={Images.ic_lock}
						onChangeText={setPassword}
						defaultValue={password}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity style={styles.forgotPass}>
					<Text style={styles.forgotPassText}>Forgot password?</Text>
				</TouchableOpacity>
			</ScrollView>
			<Button title='Log in' onPress={handleLogin} />
			<View style={styles.loginContainer}>
				<Text style={styles.hasAccount}>New to Demeter?</Text>
				<TouchableOpacity onPress={handleLoginAccount}>
					<Text style={styles.login}> Create account</Text>
				</TouchableOpacity>
			</View>
			<Popover
				contentStyle={styles.content}
				arrowStyle={styles.arrow}
				backgroundStyle={styles.transparent}
				visible={popoverVisible}
				onClose={closePopover}
				useNativeDriver
				placement='bottom'
				fromRect={popoverAnchorRect}
				supportedOrientations={['portrait', 'landscape']}
			>
				<Text style={styles.errorMessage}>{errorMessage}</Text>
			</Popover>
		</Flex>
	);
};

export default memo(LoginAccount);

const styles = StyleSheet.create({
	arrow: {
		borderTopColor: Colors.borderRed,
	},
	container: {
		flex: 1,
		paddingBottom: 16,
		paddingHorizontal: 20,
	},
	content: {
		backgroundColor: Colors.borderRed,
		borderRadius: 8,
		padding: 16,
	},
	errorMessage: {
		color: Colors.white,
	},
	flex1: {
		flex: 1,
	},
	forgotPass: {
		alignSelf: 'flex-end',
		marginBottom: 16,
	},
	forgotPassText: {
		color: Colors.green,
		fontWeight: 'bold',
		marginTop: 14,
	},
	hasAccount: {
		color: Colors.midGray,
		fontSize: 16,
	},
	inputStyle: {
		marginTop: 24,
	},
	login: {
		color: Colors.green,
		fontSize: 16,
	},
	loginContainer: {
		alignItems: 'center',
		alignSelf: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 20,
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
	transparent: {
		backgroundColor: Colors.transparent,
	},
});
