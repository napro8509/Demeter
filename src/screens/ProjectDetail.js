import React, { useEffect } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';
import Flex from '../components/Flex';
import useHeader from '../hooks/useHeader';
import { DeviceHelper } from '../utils';
import Button from '../components/Button';
import { OUTLINE } from '../constants';
import AppNavigator from '../navigation/AppNavigator';
import RemoveProject from '../popup/RemoveProject';
import { ProjectData } from './SelectProject';
import { useRemoveProjectMutation } from '@graphql/generated/graphql';

const projectInfo = ({ projectType, projectName, location, area }) => [
	{
		key: 'Project Type',
		value: projectType,
	},
	{
		key: 'Project Name',
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

const ProjectDetail = ({ navigation, route }) => {
	const { data: projectDetail } = route?.params || {};
	const { groups = [], imageUrl } = projectDetail || {};
	useHeader(navigation);
	const [removeProject] = useRemoveProjectMutation();
	const projectTypeName = ProjectData.find(
		item => item.type === projectDetail?.projectType
	)?.name;

	const data = projectInfo({
		projectType: projectTypeName,
		projectName: projectDetail?.name,
		location: projectDetail?.location,
		area: projectDetail?.area,
	});

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={styles.rightContainer}>
					<TouchableOpacity style={styles.qrIcon} onPress={handleShowOption}>
						<Image source={Images.ic_options} style={styles.icon} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	const handleShowOption = () => {
		navigation.navigate('EditProject', {
			projectId: projectDetail?.id,
			projectData: projectDetail,
		});
	};

	const handleManageDevices = () => {
		navigation.navigate('ProjectDevices');
	};

	const handleManageZones = () => {
		console.log(projectDetail);
		navigation.navigate('ManageZones', {
			projectId: projectDetail?.id,
			groups: projectDetail?.groups || [],
		});
	};

	const handleConfirmRemove = () => {
		removeProject({
			variables: {
				id: projectDetail?.id,
			},
			onCompleted: response => {
				if (response?.removeProject) {
					Alert.alert('Notification', 'Remove project successfully', [
						{ text: 'Ok', onPress: navigation.popToTop() },
					]);
				}
			},
		});
	};

	const handleRemoveProject = () => {
		AppNavigator.showBottom({
			screen: RemoveProject,
			onRemove: handleConfirmRemove,
		});
	};

	const zones = groups?.map?.(item => item.name)?.join(', ') || '';

	return (
		<Flex style={styles.container}>
			<ScrollView contentContainerStyle={styles.wrapper}>
				<Image source={{ uri: imageUrl }} style={styles.projectImage} />
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
				<TouchableOpacity style={styles.lineContainer} onPress={handleManageZones}>
					<Text style={styles.title}>Zones</Text>
					<Text style={styles.value}>{zones}</Text>
					<Image source={Images.ic_arrow_right} style={styles.rightIcon} />
				</TouchableOpacity>
			</ScrollView>
			<View style={styles.buttonContainer}>
				<Button title='Remove Project' type={OUTLINE} onPress={handleRemoveProject} />
			</View>
		</Flex>
	);
};

export default ProjectDetail;

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
		shadowColor: Colors.black,
		shadowOpacity: 0.15,
		backgroundColor: Colors.white,
	},
	icon: {
		width: 20,
		height: 20,
	},
	rightContainer: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	qrIcon: {
		marginRight: 8,
	},
});
