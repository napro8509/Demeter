import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ASYNC_AUTH_TOKEN } from '../constants';

const SplashScreen = ({ navigation }) => {
	useEffect(() => {
		AsyncStorage.getItem(ASYNC_AUTH_TOKEN, (error, result) => {
			if (result) {
				console.log(result);
				navigation?.replace('MainTab');
			} else {
				navigation?.replace('LoginMain');
			}
		});
	}, []);

	return (
		<View>
			<Text />
		</View>
	);
};

export default SplashScreen;
