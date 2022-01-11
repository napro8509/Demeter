import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const UserScreen = () => {
	return (
		<View style={styles.flex}>
			<Text>UserScreen</Text>
		</View>
	);
};

export default UserScreen;

const styles = StyleSheet.create({
	flex: {
		alignItems: 'center',
		backgroundColor: 'pink',
		flex: 1,
		justifyContent: 'center',
	},
});
