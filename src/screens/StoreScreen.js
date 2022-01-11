import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const StoreScreen = () => {
	return (
		<View style={styles.flex}>
			<Text>StoreScreen</Text>
		</View>
	);
};

export default StoreScreen;

const styles = StyleSheet.create({
	flex: {
		alignItems: 'center',
		backgroundColor: 'blue',
		flex: 1,
		justifyContent: 'center',
	},
});
