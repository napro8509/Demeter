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
import { useCreateGroupMutation } from '../graphql/generated/graphql';

const CreateZones = ({ navigation, route }) => {
	const [imageSource, setImageSource] = useState(undefined);
	const [name, setName] = useState('');
	const [area, setArea] = useState('');
	const [location, setLocation] = useState('');
	const { projectId } = route?.params || {};
	useHeader(navigation);

	const [createGroup] = useCreateGroupMutation();

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
		createGroup({
			variables: {
				input: {
					area,
					location,
					name,
					startDate: new Date().toDateString(),
					endDate: new Date().toDateString(),
					projectId,
					imageUrl: imageSource,
				},
			},
			onCompleted: () => {
				Alert.alert('Notification', 'Create zone successfully', [
					{ text: 'Ok', onPress: navigation.popToTop() },
				]);
			},
			onError: console.log,
		});
	};

	const source = {
		uri: imageSource,
	};

	return (
		<Flex style={styles.container} keyboardAvoidView>
			<ScrollView style={styles.wrapper}>
				<TouchableOpacity style={styles.button} onPress={handleSelectImage}>
					<Image
						source={imageSource ? source : Images.ic_add_image}
						style={styles.addButton}
					/>
				</TouchableOpacity>
				<Input leftText='Zone Name' containerStyle={styles.input} onChangeText={setName} />
				<Input
					leftText='Location'
					containerStyle={styles.input}
					onChangeText={setLocation}
				/>
				<Input leftText='Area' containerStyle={styles.input} onChangeText={setArea} />
			</ScrollView>
			<Button title='Create Zones' style={styles.buttonEnd} onPress={handleCreateProject} />
		</Flex>
	);
};

export default CreateZones;

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
