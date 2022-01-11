import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Images from '../assets/images';
import { Button } from '../components';
import Flex from '../components/Flex';
import Input from '../components/Input';
import useHeader from '../hooks/useHeader';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
const CreateProject = ({ navigation }) => {
	useHeader(navigation);

	const handleSelectImage = async () => {
		const result = await launchImageLibrary({
			mediaType: 'photo',
		});
		console.log(result);
	};

	const handleCreateProject = () => {};
	return (
		<Flex style={styles.container} keyboardAvoidView>
			<ScrollView style={styles.wrapper}>
				<TouchableOpacity style={styles.button} onPress={handleSelectImage}>
					<Image source={Images.ic_add_image} style={styles.addButton} />
				</TouchableOpacity>
				<Input leftText='Project Name' containerStyle={styles.input} />
				<Input leftText='Location' containerStyle={styles.input} />
				<Input leftText='Area' containerStyle={styles.input} />
			</ScrollView>
			<Button title='Create Project' style={styles.buttonEnd} onPress={handleCreateProject} />
		</Flex>
	);
};

export default CreateProject;

const styles = StyleSheet.create({
	addButton: {
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
	},
	input: {
		marginHorizontal: 20,
		marginTop: 16,
	},
	wrapper: {
		flex: 1,
	},
});
