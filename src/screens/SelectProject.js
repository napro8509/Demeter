import React, { useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import { DISABLED, PRIMARY } from '../constants';
import useHeader from '../hooks/useHeader';
import DeviceHelper from '../utils/DeviceHelper';

const data = [
	{
		icon: Images.ic_project_agircuture,
		name: 'Agriculture',
	},
	{
		icon: Images.ic_project_smarthome,
		name: 'Smart home',
	},
	{
		icon: Images.ic_project_education,
		name: 'Education',
	},
	{
		icon: Images.ic_project_medical,
		name: 'Medical',
	},
	{
		icon: Images.ic_project_industrial,
		name: 'Industrial',
	},
	{
		icon: Images.ic_project_weatherstation,
		name: 'Weather Station',
	},
	{
		icon: Images.ic_project_gis,
		name: 'GIS',
	},
	{
		icon: Images.ic_project_other,
		name: 'Others',
	},
];

const SelectProject = ({ navigation }) => {
	useHeader(navigation);
	const [selectedType, setSelectedType] = useState(null);

	const keyExtractor = item => item.name;

	const handleSelectProject = item => {
		setSelectedType(item);
	};

	const handleCreateProject = () => {
		navigation.navigate('CreateProjectScreen');
	};

	const renderItem = ({ item, index }) => (
		<View style={{ flex: 1 / 3, alignItems: 'center' }}>
			<TouchableOpacity
				style={styles.projectItem(item?.name === selectedType?.name)}
				onPress={() => handleSelectProject(item)}
			>
				<Image
					source={item.icon}
					style={styles.iconProject(item?.name === selectedType?.name)}
				/>
			</TouchableOpacity>
			<Text style={styles.projectName(item?.name === selectedType?.name)}>{item?.name}</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<Text style={styles.projectType}>Choose a Project Type</Text>
			<FlatList
				numColumns={3}
				data={data}
				renderItem={renderItem}
				keyExtractor={keyExtractor}
				columnWrapperStyle={styles.column}
			/>
			<Button
				title='Create Project'
				style={styles.button}
				type={!selectedType ? DISABLED : PRIMARY}
				onPress={handleCreateProject}
			/>
		</View>
	);
};

export default SelectProject;

const styles = StyleSheet.create({
	button: {
		marginBottom: 20,
	},
	column: {
		flex: 1,
		marginTop: 20,
	},
	container: {
		backgroundColor: Colors.white,
		flex: 1,
		paddingHorizontal: 20,
	},
	content: {
		flex: 1,
	},
	flex: {
		alignItems: 'center',
		backgroundColor: 'red',
		justifyContent: 'center',
		width: (DeviceHelper.screenWidth - 80) / 3,
	},
	iconProject: isSelected => ({
		height: 50,
		width: 50,
		tintColor: isSelected ? Colors.green : Colors.midGray,
	}),
	projectItem: isSelected => ({
		alignItems: 'center',
		borderColor: isSelected ? Colors.green : 'rgba(224, 224, 224, 1)',
		borderRadius: 49,
		borderWidth: 1,
		height: 98,
		justifyContent: 'center',
		width: 98,
	}),
	projectName: isSelected => ({
		fontSize: 14,
		color: isSelected ? Colors.green : Colors.midGray,
		marginTop: 10,
		textAlign: 'center',
	}),
	projectType: {
		color: Colors.darkGray,
		fontSize: 17,
		fontWeight: '500',
		marginTop: 20,
		textAlign: 'center',
	},
});
