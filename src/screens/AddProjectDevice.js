import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import useHeader from '../hooks/useHeader';

const projectList = [
	{
		icon: Images.ic_camera,
		name: 'Camera 101',
		id: 'Camera 101',
	},
	{
		icon: Images.ic_sensor,
		name: 'Sensor 102',
		id: 'Sensor 102',
	},
	{
		icon: Images.ic_switch,
		name: 'Switch 103',
		id: 'Switch 103',
	},
];

const AddProjectDevice = ({ navigation }) => {
	useHeader(navigation);

	const handleCreateProject = () => {
		navigation.navigate('SelectProjectScreen');
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
							<Image source={Images.ic_add_device} style={styles.iconDelete} />
						</TouchableOpacity>
					</TouchableOpacity>
				))}
			</View>
		</Flex>
	);
};

export default AddProjectDevice;

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
