import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NotificationScreen = () => {
	return (
		<View style={styles.flex}>
			<Text>NotificationScreen</Text>
		</View>
	);
};

export default NotificationScreen;

const styles = StyleSheet.create({
	flex: {
		alignItems: 'center',
		backgroundColor: 'green',
		flex: 1,
		justifyContent: 'center',
	},
});
