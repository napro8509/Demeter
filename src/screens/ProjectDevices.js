import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import useHeader from '../hooks/useHeader';

const projectList = [
	{
		icon: Images.ic_light,
		name: 'Light 101',
		id: 'Light 101',
	},
	{
		icon: Images.ic_light,
		name: 'Light 102',
		id: 'Light 102',
	},
	{
		icon: Images.ic_light,
		name: 'Light 103',
		id: 'Light 103',
	},
];

const ProjectDevices = ({ navigation }) => {
	useHeader(navigation);

	const handleCreateProject = () => {
		navigation.navigate('AddProjectDevice');
	};

	const handleGoProjectDetail = () => {};

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
						<TouchableOpacity>
							<Image source={Images.ic_delete} style={styles.iconDelete} />
						</TouchableOpacity>
					</TouchableOpacity>
				))}
			</View>
			<Button title='Add Devices' onPress={handleCreateProject} />
		</Flex>
	);
};

export default ProjectDevices;

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
		flex: 1,
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
	iconDelete: {
		width: 22,
		height: 22,
	},
});
