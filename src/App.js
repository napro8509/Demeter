import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider, View } from 'native-base';
import React, { useEffect } from 'react';
import { Platform, StatusBar, StyleSheet, Text } from 'react-native';
import { Fonts } from './assets/fonts';
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
import RegisterSuccess from './screens/RegisterSuccess';
import MainTab from './screens/MainTab';
import SelectProject from './screens/SelectProject';
import CreateProject from './screens/CreateProject';
import Test from './screens/Test';
import DialogScreen from './popup/DialogScreen';
import ManageProjects from './screens/ManageProjects';
import ProjectDetail from './screens/ProjectDetail';
import ManageZones from './screens/ManageZones';
import ZoneDetail from './screens/ZoneDetail';
import ProjectDevices from './screens/ProjectDevices';
import AddProjectDevice from './screens/AddProjectDevice';
import SplashScreen from './screens/SplashScreen';
import withApollo from './graphql';
import AddDevice from './screens/AddDevice';
import ConnectWifi from './screens/ConnectWifi';
import RegisterDevice from './screens/RegisterDevice';
import CreateZones from './screens/CreateZones';

const Stack = createNativeStackNavigator();

const MainStack = createNativeStackNavigator();

const MainStackNavigator = () => (
	<MainStack.Navigator initialRouteName='SplashScreen'>
		<MainStack.Screen
			name='SplashScreen'
			component={SplashScreen}
			options={{
				headerTransparent: true,
			}}
		/>
		<MainStack.Screen
			name='LoginAccount'
			component={LoginAccount}
			options={{
				title: '',
				headerBackTitleVisible: false,
				headerTransparent: true,
			}}
		/>
		<MainStack.Screen name='SmartConfig' component={SmartConfig} />
		<MainStack.Screen
			name='LoginMain'
			component={LoginMain}
			options={{
				headerShown: false,
			}}
		/>
		<MainStack.Screen name='HomeScreen' component={HomeScreen} />
		<MainStack.Screen name='RequestScreen' component={RequestScreen} />
		<MainStack.Screen
			options={{
				title: '',
				headerBackTitleVisible: false,
				headerTransparent: true,
			}}
			name='RegisterScreen'
			component={RegisterScreen}
		/>
		<MainStack.Screen
			options={{
				title: '',
				headerBackTitleVisible: false,
				headerTransparent: true,
			}}
			name='RegisterSuccess'
			component={RegisterSuccess}
		/>
		<MainStack.Screen
			options={{
				headerShown: false,
			}}
			name='MainTab'
			component={MainTab}
		/>
		<MainStack.Screen
			options={{
				title: 'Add Project',
			}}
			name='SelectProjectScreen'
			component={SelectProject}
		/>
		<MainStack.Screen
			options={{
				title: 'Create Project',
			}}
			name='CreateProjectScreen'
			component={CreateProject}
		/>
		<MainStack.Screen
			options={{
				title: 'Create Project',
			}}
			name='TestScreen'
			component={Test}
		/>
		<MainStack.Screen
			options={{
				title: 'Manage Projects',
			}}
			name='ManageProjects'
			component={ManageProjects}
		/>
		<MainStack.Screen
			options={{
				title: 'Project Info',
			}}
			name='ProjectDetailScreen'
			component={ProjectDetail}
		/>
		<MainStack.Screen
			options={{
				title: 'Manage Zones',
			}}
			name='ManageZones'
			component={ManageZones}
		/>
		<MainStack.Screen
			options={{
				title: 'Zone Detail',
			}}
			name='ZoneDetailScreen'
			component={ZoneDetail}
		/>
		<MainStack.Screen
			options={{
				title: 'Project Devices',
			}}
			name='ProjectDevices'
			component={ProjectDevices}
		/>
		<MainStack.Screen
			options={{
				title: 'Add Project Device',
			}}
			name='AddProjectDevice'
			component={AddProjectDevice}
		/>
		<MainStack.Screen
			options={{
				title: 'Add Device',
			}}
			name='AddDevice'
			component={AddDevice}
		/>
		<MainStack.Screen
			options={{
				title: 'Nearby Wireless Devices',
			}}
			name='ConnectWifi'
			component={ConnectWifi}
		/>
		<MainStack.Screen
			options={{
				title: 'Register Device',
			}}
			name='RegisterDevice'
			component={RegisterDevice}
		/>
		<MainStack.Screen
			options={{
				title: 'Create zones',
			}}
			name='CreateZones'
			component={CreateZones}
		/>
	</MainStack.Navigator>
);

function App() {
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
					<NavigationContainer ref={AppNavigator.setRootNavigator}>
						<Stack.Navigator
							screenOptions={{
								headerShown: false,
							}}
						>
							<Stack.Group>
								<Stack.Screen name='MainStack' component={MainStackNavigator} />
							</Stack.Group>
							<Stack.Group
								screenOptions={{
									presentation: 'transparentModal',
									animation: 'fade',
								}}
							>
								<Stack.Screen name='Dialog' component={DialogScreen} />
							</Stack.Group>
						</Stack.Navigator>
					</NavigationContainer>
					<Loading ref={AppNavigator.setLoadingRef} />
				</View>
			</GlobalProvider>
		</NativeBaseProvider>
	);
}

const AppWithApollo = () => withApollo(App);

export default () => {
	return <AppWithApollo />;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
