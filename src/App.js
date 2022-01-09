import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, View } from 'native-base';
import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import { Fonts } from './assets/fonts';
import Images from './assets/images';
import Loading from './components/Loading';
import { GlobalProvider } from './context/Provider';
import AppNavigator from './navigation/AppNavigator';
import HomeScreen from './screens/HomeScreen';
import LoginAccount from './screens/LoginAccount';
import LoginMain from './screens/LoginMain';
import RegisterScreen from './screens/RegisterScreen';
import RequestScreen from './screens/RequestScreen';
import SmartConfig from './screens/SmartConfig';
import DeviceHelper from './utils/DeviceHelper';
import { HeaderBackButton, Header } from '@react-navigation/elements';
import { Colors } from './assets/colors';
import RegisterSuccess from './screens/RegisterSuccess';

const Stack = createNativeStackNavigator();

export default function App() {
	useEffect(() => {
		const oldRender = Text.render;
		Text.render = (...args) => {
			const origin = oldRender.call(this, ...args);
			let fontFamily = Fonts.Roboto_Regular;
			if (!DeviceHelper.isIOS()) {
				if (origin.props.style?.fontWeight === 'bold') {
					fontFamily = Fonts.Roboto_Bold;
				} else if (origin.props.style?.fontWeight) {
					fontFamily = Fonts.Roboto_Medium;
				}
			}
			return React.cloneElement(origin, {
				style: [{ fontFamily }, origin.props.style],
			});
		};
		if (Platform.OS === 'android') {
			StatusBar.setBackgroundColor('transparent');
			StatusBar.setTranslucent(true);
		}
	}, []);

	return (
		<NativeBaseProvider>
			<GlobalProvider>
				<View style={styles.container}>
					<NavigationContainer>
						<Stack.Navigator initialRouteName='RegisterSuccess'>
							<Stack.Screen
								name='LoginAccount'
								component={LoginAccount}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen name='SmartConfig' component={SmartConfig} />
							<Stack.Screen name='LoginMain' component={LoginMain} />
							<Stack.Screen name='Home' component={HomeScreen} />
							<Stack.Screen name='RequestScreen' component={RequestScreen} />
							<Stack.Screen
								options={{
									title: '',
									headerBackTitleVisible: false,
									headerTransparent: true,
									// headerBackImageSource: Images.ic_back,
								}}
								name='RegisterScreen'
								component={RegisterScreen}
							/>
							<Stack.Screen
								options={{
									title: '',
									headerBackTitleVisible: false,
									headerTransparent: true,
								}}
								name='RegisterSuccess'
								component={RegisterSuccess}
							/>
						</Stack.Navigator>
					</NavigationContainer>
					<Loading ref={AppNavigator.setLoadingRef} />
				</View>
			</GlobalProvider>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
