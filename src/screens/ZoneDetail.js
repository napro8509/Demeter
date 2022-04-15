import React from 'react';
import { Alert, DeviceEventEmitter, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';
import Flex from '../components/Flex';
import useHeader from '../hooks/useHeader';
import { DeviceHelper } from '../utils';
import Button from '../components/Button';
import { OUTLINE } from '../constants';
import AppNavigator from '../navigation/AppNavigator';
import RemoveProject from '../popup/RemoveProject';
import { useRemoveGroupMutation } from '@graphql/generated/graphql';
const projectInfo = ({ projectType, projectName, location, area }) => [
	{
		key: 'Zone Type',
		value: projectType,
	},
	{
		key: 'Zone Name',
		value: projectName,
	},
	{
		key: 'Location',
		value: location,
	},
	{
		key: 'Area',
		value: area,
	},
];

const ZoneDetail = ({ navigation, route }) => {
	useHeader(navigation);
	const { zoneData } = route?.params || {};
	console.log(zoneData);

	const [removeZone] = useRemoveGroupMutation();

	const data = projectInfo({
		projectType: 'Container 1',
		projectName: zoneData?.name,
		location: zoneData?.location,
		area: zoneData?.area,
	});

	const handleManageDevices = () => {};

	const handleRemoveProject = () => {
		AppNavigator.showBottom({
			screen: RemoveProject,
			onRemove: handleRemoveZone,
		});
	};

	const handleUpdate = () => {
		Alert.alert('Notification', 'Remove zone successfully', [
			{
				text: 'Ok',
				onPress: () => {
					navigation.popToTop();
					DeviceEventEmitter.emit('UPDATE_PROJECT');
				},
			},
		]);
	};

	const handleRemoveZone = () => {
		removeZone({
			variables: {
				id: zoneData?.id,
			},
			onCompleted: handleUpdate,
		});
	};

	return (
		<Flex style={styles.container}>
			<ScrollView contentContainerStyle={styles.wrapper}>
				<Image source={Images.ic_tomato} style={styles.projectImage} />
				<Text style={styles.information}>Information</Text>
				<Image source={Images.img_maps} style={styles.maps} />
				{data.map(item => (
					<TouchableOpacity style={styles.lineContainer} key={item.key}>
						<Text style={styles.title}>{item.key}</Text>
						<Text style={styles.value}>{item.value}</Text>
						<Image source={Images.ic_arrow_right} style={styles.rightIcon} />
					</TouchableOpacity>
				))}
				<Text style={styles.information}>Manage</Text>
				<TouchableOpacity style={styles.lineContainer} onPress={handleManageDevices}>
					<Text style={styles.title}>Devices</Text>
					<Image source={Images.ic_arrow_right} style={styles.rightIcon} />
				</TouchableOpacity>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button title='Remove Zone' type={OUTLINE} onPress={handleRemoveProject} />
			</View>
		</Flex>
	);
};

export default ZoneDetail;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	projectImage: {
		width: 80,
		height: 80,
		borderRadius: 5,
		alignSelf: 'center',
		marginTop: 18,
	},
	information: {
		fontSize: 17,
		fontWeight: '700',
		marginTop: 24,
		color: Colors.black,
	},
	wrapper: {
		paddingHorizontal: 20,
		paddingBottom: 24,
	},
	maps: {
		width: DeviceHelper.screenWidth - 40,
		height: ((DeviceHelper.screenWidth - 40) / 335) * 175,
		marginTop: 20,
	},
	rightIcon: {
		width: 24,
		height: 24,
	},
	lineContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: Colors.underline,
	},
	title: {
		flex: 1,
		fontSize: 15,
		color: Colors.black,
	},
	value: {
		fontSize: 15,
		color: Colors.midGray,
	},
	buttonContainer: {
		padding: 20,
		paddingVertical: 16,
		shadowRadius: 20,
		shadowColor: 'black',
		shadowOpacity: 0.15,
		backgroundColor: Colors.white,
	},
});
