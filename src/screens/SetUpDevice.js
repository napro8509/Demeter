import React, { useState } from 'react';
import {
	Alert,
	DeviceEventEmitter,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Flex from '@components/Flex';
import { Colors, Images } from '@assets';
import Input from '@components/Input';
import useSelector from '@context/useSelector';
import { Button } from '@components';
import { useHeader } from '@hooks';
import { useUpdateDeviceMutation } from '@graphql/generated/graphql';

const SetUpDevice = ({ route, navigation }) => {
	useHeader(navigation);
	const { deviceId } = route?.params || {};
	const { projects = [] } = useSelector('project') || {};
	console.log(projects);

	const [updateDevice] = useUpdateDeviceMutation();
	const [selectedProject, setSelectedProject] = useState(undefined);
	const handleSelectProject = projectId => {
		setSelectedProject(projectId);
	};

	const handleUseNow = () => {
		updateDevice({
			variables: {
				id: deviceId,
				input: {
					projectId: selectedProject,
				},
			},
			onCompleted: handleCompleted,
		});
	};

	const handleCompleted = () => {
		Alert.alert('Notification', 'Update device successfully', [
			{
				text: 'Ok',
				onPress: () => {
					navigation.popToTop();
					DeviceEventEmitter.emit('UPDATE_PROJECT');
				},
			},
		]);
	};

	return (
		<Flex style={styles.container}>
			<ScrollView style={styles.wrapper}>
				<Image source={Images.ic_device_switch} style={styles.iconSwitch} />
				<Input
					leftText='Project Name'
					defaultValue='DMT_ESOC_1576480'
					containerStyle={styles.input}
					editable={false}
				/>
				<Text style={styles.text}>Add to project</Text>
				{projects.map(item => (
					<TouchableOpacity
						style={styles.projectItem}
						onPress={() => handleSelectProject(item?.id)}
					>
						<Image style={styles.icon} source={{ uri: item?.imageUrl }} />
						<Text style={styles.projectName}>{item?.name}</Text>
						<Image
							style={styles.iconSelect}
							source={
								item?.id === selectedProject
									? Images.ic_selected
									: Images.ic_un_selected
							}
						/>
					</TouchableOpacity>
				))}
			</ScrollView>
			<Button title='Use Now' onPress={handleUseNow} />
		</Flex>
	);
};

export default SetUpDevice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: 20,
	},
	iconSwitch: {
		width: 125,
		height: 125,
		alignSelf: 'center',
		marginTop: 20,
	},
	text: {
		fontSize: 17,
		color: Colors.black,
		fontWeight: 'bold',
		marginTop: 48,
	},
	projectName: {
		fontSize: 16,
		color: Colors.black,
		flex: 1,
	},
	projectItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
	},
	icon: {
		width: 48,
		height: 48,
		borderRadius: 8,
		overflow: 'hidden',
		marginRight: 6,
	},
	iconSelect: {
		width: 24,
		height: 24,
	},
	wrapper: {
		flex: 1,
	},
});
