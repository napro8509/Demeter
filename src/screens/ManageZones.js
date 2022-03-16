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
		name: 'Zones 101',
		id: 'Zones 101',
	},
	{
		icon: Images.ic_tomato,
		name: 'Zones 102',
		id: 'Zones 102',
	},
	{
		icon: Images.ic_tomato,
		name: 'Zones 103',
		id: 'Zones 103',
	},
];

const ManageZones = ({ navigation, route }) => {
	useHeader(navigation);
	const { projectId, groups } = route?.params || {};
	console.log(groups);
	const handleCreateProject = () => {
		navigation.navigate('CreateZones', {
			projectId,
		});
	};

	const handleGoProjectDetail = () => {
		navigation.navigate('ZoneDetailScreen');
	};

	return (
		<Flex style={styles.container}>
			<View style={styles.wrapper}>
				{groups.map(item => (
					<TouchableOpacity
						style={styles.button}
						onPress={handleGoProjectDetail}
						key={item.id}
					>
						<Image source={{ uri: item?.imageUrl }} style={styles.icon} />
						<Text style={styles.name}>{item.name}</Text>
					</TouchableOpacity>
				))}
			</View>
			<Button title='Create Zones' onPress={handleCreateProject} />
		</Flex>
	);
};

export default ManageZones;

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
		borderRadius: 8,
	},
	wrapper: {
		flex: 1,
	},
});
