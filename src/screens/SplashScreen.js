import AsyncStorage from '@react-native-async-storage/async-storage';
import { useGetProfileLazyQuery } from '@graphql/generated/graphql';
import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { ASYNC_AUTH_TOKEN } from '../constants';

const SplashScreen = ({ navigation }) => {
	const [getProfile] = useGetProfileLazyQuery();

	useEffect(() => {
		AsyncStorage.getItem(ASYNC_AUTH_TOKEN, (error, result) => {
			if (result) {
				console.log(result);
				getProfile({
					variables: {},
					onCompleted: data => {
						console.log('data', data);
						if (data) {
							navigation?.replace('HomeScreen');
						} else {
							navigation?.replace('LoginMain');
						}
					},
				});
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
