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
import { useCreateProjectMutation } from '../graphql/generated/graphql';

const CreateProject = ({ navigation, route }) => {
	const [imageSource, setImageSource] = useState(undefined);
	const [name, setName] = useState('');
	const [area, setArea] = useState('');
	const [location, setLocation] = useState('');
	const { projectType } = route?.params || {};
	useHeader(navigation);

	const [createProject] = useCreateProjectMutation();

	const handleSelectImage = async () => {
		const result = await launchImageLibrary({
			mediaType: 'photo',
		});
		const url = result?.assets?.[0]?.uri;
		if (url) {
			CommonUtils.uploadFile({
				fileUri: url,
				fileType: mime.lookup(url) || 'image',
				fileName: `picture_${new Date().getTime()}`,
			}).then(source => {
				setImageSource(source);
			});
		}
	};

	const handleCreateProject = () => {
		createProject({
			variables: {
				input: {
					area,
					location,
					name,
					startDate: new Date().toDateString(),
					endDate: new Date().toDateString(),
					projectType,
				},
			},
			onCompleted: () => {
				Alert.alert('Notification', 'Create project successfully', [
					{ text: 'Ok', onPress: navigation.popToTop() },
				]);
			},
		});
	};

	return (
		<Flex style={styles.container} keyboardAvoidView>
			<ScrollView style={styles.wrapper}>
				<TouchableOpacity style={styles.button} onPress={handleSelectImage}>
					<Image
						source={{
							uri: imageSource,
						}}
						style={styles.addButton}
					/>
				</TouchableOpacity>
				<Input
					leftText='Project Name'
					containerStyle={styles.input}
					onChangeText={setName}
				/>
				<Input
					leftText='Location'
					containerStyle={styles.input}
					onChangeText={setLocation}
				/>
				<Input leftText='Area' containerStyle={styles.input} onChangeText={setArea} />
			</ScrollView>
			<Button title='Create Project' style={styles.buttonEnd} onPress={handleCreateProject} />
		</Flex>
	);
};

export default CreateProject;

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
