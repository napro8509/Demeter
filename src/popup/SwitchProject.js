import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';

const projectList = [
	{
		icon: Images.ic_tomato,
		name: 'Plant 101',
		id: 'Plant 101',
	},
	{
		icon: Images.ic_tomato,
		name: 'Plant 101',
		id: 'Plant 101',
	},
];

const SwitchProject = () => {
	return (
		<View style={styles.container}>
			<Text />
		</View>
	);
};

export default SwitchProject;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		height: 100,
		width: '100%',
	},
});
