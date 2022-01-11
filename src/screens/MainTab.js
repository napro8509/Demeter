import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import StoreScreen from './StoreScreen';
import NotificationScreen from './NotificationScreen';
import UserScreen from './UserScreen';
import Images from '../assets/images';
import { Colors } from '../assets/colors';
const Tab = createBottomTabNavigator();

const MainTab = () => {
	return (
		<Tab.Navigator
			backBehavior='none'
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarIcon: ({ focused }) => {
					let iconName;
					if (route.name === 'HomeScreen') {
						iconName = Images.ic_home;
					} else if (route.name === 'StoreScreen') {
						iconName = Images.ic_store;
					} else if (route.name === 'NotificationScreen') {
						iconName = Images.ic_notification;
					} else {
						iconName = Images.ic_user;
					}
					return (
						<Image
							source={iconName}
							style={[
								styles.icon,
								{ tintColor: focused ? Colors.green : Colors.gray },
							]}
						/>
					);
				},
			})}
		>
			<Tab.Screen component={HomeScreen} name='HomeScreen' />
			<Tab.Screen component={StoreScreen} name='StoreScreen' />
			<Tab.Screen component={NotificationScreen} name='NotificationScreen' />
			<Tab.Screen component={UserScreen} name='UserScreen' />
		</Tab.Navigator>
	);
};

export default MainTab;

const styles = StyleSheet.create({
	icon: {
		height: 24,
		width: 24,
	},
});
