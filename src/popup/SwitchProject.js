import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
		name: 'Plant 102',
		id: 'Plant 102',
	},
	{
		icon: Images.ic_tomato,
		name: 'Plant 103',
		id: 'Plant 103',
	},
];

const SwitchProject = ({ requestClose, onManageProject }) => {
	const [selectedProject, setSelectedProject] = useState(projectList[0]);

	const handleManageProject = () => {
		onManageProject?.();
		requestClose?.();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Switch Project</Text>
				<TouchableOpacity onPress={requestClose}>
					<Image source={Images.ic_close} style={styles.iconClose} />
				</TouchableOpacity>
			</View>
			{projectList.map(item => (
				<TouchableOpacity
					style={styles.button(selectedProject?.id === item?.id)}
					onPress={() => setSelectedProject(item)}
				>
					<Image source={item.icon} style={styles.icon} />
					<Text style={styles.name(selectedProject?.id === item?.id)}>{item.name}</Text>
				</TouchableOpacity>
			))}
			<TouchableOpacity style={styles.moreOptions} onPress={handleManageProject}>
				<Image source={Images.ic_more_options} style={styles.iconOptions} />
				<Text style={styles.name}>Manage Projects</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SwitchProject;

const styles = StyleSheet.create({
	button: isSelected => ({
		alignItems: 'center',
		borderColor: isSelected ? Colors.green : Colors.border,
		borderRadius: 8,
		borderWidth: 1,
		flexDirection: 'row',
		marginTop: 10,
		padding: 5,
	}),
	container: {
		backgroundColor: Colors.white,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		padding: 20,
		width: '100%',
	},
	icon: {
		height: 45,
		width: 45,
	},
	iconOptions: {
		height: 55,
		width: 55,
	},
	moreOptions: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	name: isSelected => ({
		color: isSelected ? Colors.green : Colors.midGray,
		fontSize: 16,
		marginLeft: 6,
		fontWeight: '500',
	}),
	title: {
		color: Colors.black,
		fontSize: 16,
		flex: 1,
	},
	iconClose: {
		width: 24,
		height: 24,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});
