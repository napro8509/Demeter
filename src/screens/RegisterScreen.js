import React, { memo, useEffect, useRef } from 'react';
import { createRef } from 'react';
import { useState } from 'react';
import { Image, Keyboard, ScrollView, StyleSheet, Text, View } from 'react-native';
import Popover, { usePopover } from 'react-native-modal-popover';
import Colors from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import Input from '../components/Input';
import { AuthApi } from '../services/api';
import { useStateCallback } from 'react-native-component-kits';
import useHeader from '../hooks/useHeader';
import CommonUtils from '../utils/CommonUtils';

const RegisterScreen = ({ navigation }) => {
	useHeader(navigation);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [rePassword, setRePassword] = useState('');
	const [phone, setPhone] = useState('');

	const [errorMessage, setErrorMessage] = useStateCallback('');
	const { openPopover, closePopover, popoverVisible, touchableRef, popoverAnchorRect } =
		usePopover();
	const scrollRef = createRef();
	const emailRef = createRef();
	const passwordRef = createRef();
	const phoneRef = createRef();

	useEffect(() => {
		Keyboard.addListener('keyboardDidShow', handleScrollEnd);
		touchableRef.current = emailRef.current;
	}, []);

	const handleScrollEnd = () => {
		scrollRef?.current?.scrollToEnd?.();
	};

	const handleValidate = () => {
		if (!email || !password) {
			setErrorMessage('Please input email and password', () => {
				openPopover?.();
			});
			return false;
		} else if (!CommonUtils.validateEmail(email)) {
			setErrorMessage('Wrong email address!', () => {
				openPopover?.();
			});
			return false;
		} else if (password !== rePassword) {
			setErrorMessage('Password not matched!', () => {
				openPopover?.();
			});
			return false;
		} else {
			setErrorMessage('');
			Keyboard.dismiss();
			return true;
		}
	};

	const handleLogin = () => {
		const isValidated = handleValidate();
		if (!isValidated) return;
		Keyboard.dismiss();
		touchableRef.current = passwordRef.current;
		AuthApi.register({ phone, email, password })
			.then(data => {
				navigation.navigate('RegisterSuccess');
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
				<Text style={styles.loginText}>Create your account</Text>
				<View ref={emailRef}>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Email address'
						leftIcon={Images.ic_user}
						onChangeText={setEmail}
						defaultValue={email}
					/>
				</View>
				<View ref={phoneRef}>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Phone number'
						leftIcon={Images.ic_user}
						onChangeText={setPhone}
						defaultValue={phone}
					/>
				</View>
				<View ref={passwordRef}>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Password'
						leftIcon={Images.ic_lock}
						onChangeText={setPassword}
						defaultValue={password}
						secureTextEntry
					/>
				</View>
				<View>
					<Input
						containerStyle={styles.inputStyle}
						placeholder='Confirm password'
						leftIcon={Images.ic_lock}
						onChangeText={setRePassword}
						defaultValue={rePassword}
						secureTextEntry
					/>
				</View>
			</ScrollView>
			<Button title='Create' onPress={handleLogin} />
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

export default memo(RegisterScreen);

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
	inputStyle: {
		marginTop: 24,
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
