import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import useHeader from '../hooks/useHeader';

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

const ManageProjects = ({ navigation }) => {
	useHeader(navigation);

	const handleCreateProject = () => {
		navigation.navigate('SelectProjectScreen');
	};

	const handleGoProjectDetail = () => {
		navigation.navigate('ProjectDetailScreen');
	};

	return (
		<Flex style={styles.container}>
			<View style={styles.wrapper}>
				{projectList.map(item => (
					<TouchableOpacity
						style={styles.button}
						onPress={handleGoProjectDetail}
						key={item.id}
					>
						<Image source={item.icon} style={styles.icon} />
						<Text style={styles.name}>{item.name}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Button title='Create Project' onPress={handleCreateProject} />
		</Flex>
	);
};

export default ManageProjects;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	name: {
		color: Colors.black,
		fontSize: 16,
		marginLeft: 6,
		fontWeight: '500',
	},
	button: {
		alignItems: 'center',
		borderColor: Colors.border,
		borderRadius: 8,
		flexDirection: 'row',
		marginTop: 10,
		padding: 5,
		paddingVertical: 16,
		borderBottomWidth: 1,
	},
	icon: {
		height: 45,
		width: 45,
	},
	wrapper: {
		flex: 1,
	},
});
