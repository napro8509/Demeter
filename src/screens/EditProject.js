import React from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import Input from '../components/Input';
import useHeader from '../hooks/useHeader';
import { launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import Colors from '../assets/colors';
import * as mime from 'react-native-mime-types';
import { CommonUtils } from '@utils';
import { useUpdateProjectMutation } from '../graphql/generated/graphql';

const EditProject = ({ navigation, route }) => {
	const { projectId, projectData } = route?.params || {};
	const {
		imageUrl,
		area: areaDefault,
		location: locationDefault,
		name: nameDefault,
	} = projectData || {};
	const [imageSource, setImageSource] = useState(imageUrl);
	const [name, setName] = useState(nameDefault || '');
	const [area, setArea] = useState(areaDefault || '');
	const [location, setLocation] = useState(locationDefault || '');
	useHeader(navigation);

	const [updateProject] = useUpdateProjectMutation();

	const handleSelectImage = async () => {
		const result = await launchImageLibrary({
			mediaType: 'mixed',
		});
		const url = result?.assets?.[0]?.uri;
		if (url) {
			CommonUtils.uploadFile({
				fileUri: url,
				fileType: mime.lookup(url) || 'image',
				fileName: `picture_${new Date().getTime()}`,
			}).then(source => {
				console.log(source);
				setImageSource(source);
			});
		}
	};

	const handleCreateProject = () => {
		console.log({
			area,
			location,
			name,
			startDate: new Date().toDateString(),
			endDate: new Date().toDateString(),
			imageUrl: imageSource,
		});
		updateProject({
			variables: {
				input: {
					area,
					location,
					name,
					startDate: new Date().toDateString(),
					endDate: new Date().toDateString(),
					imageUrl: imageSource,
				},
				id: projectId,
			},
			onCompleted: () => {
				Alert.alert('Notification', 'Save project successfully', [
					{ text: 'Ok', onPress: navigation.popToTop() },
				]);
			},
			onError: console.log,
		});
	};

	const displaySource = {
		uri: imageSource,
	};

	return (
		<Flex style={styles.container} keyboardAvoidView>
			<ScrollView style={styles.wrapper}>
				<TouchableOpacity style={styles.button} onPress={handleSelectImage}>
					<Image
						source={imageSource ? displaySource : Images.ic_add_image}
						style={styles.addButton}
					/>
				</TouchableOpacity>
				<Input
					leftText='Project Name'
					containerStyle={styles.input}
					onChangeText={setName}
					defaultValue={name}
				/>
				<Input
					leftText='Location'
					containerStyle={styles.input}
					onChangeText={setLocation}
					defaultValue={location}
				/>
				<Input
					defaultValue={area}
					leftText='Area'
					containerStyle={styles.input}
					onChangeText={setArea}
				/>
			</ScrollView>
			<Button title='Save Project' style={styles.buttonEnd} onPress={handleCreateProject} />
		</Flex>
	);
};

export default EditProject;

const styles = StyleSheet.create({
	addButton: {
		borderRadius: 5,
		height: 80,
		width: 80,
	},
	button: {
		alignSelf: 'center',
		marginTop: 20,
	},
	buttonEnd: {
		marginBottom: 20,
		marginHorizontal: 20,
	},
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	input: {
		marginHorizontal: 20,
		marginTop: 16,
	},
	wrapper: {
		flex: 1,
	},
});
