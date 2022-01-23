import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Colors from '../assets/colors';
import Images from '../assets/images';

const RemoveProject = ({ requestClose }) => {
	const handleCancel = () => {
		requestClose?.();
	};

	const handleRemove = () => {
		requestClose?.();
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Are you sure you want to remove this project?</Text>
				<TouchableOpacity onPress={requestClose}>
					<Image source={Images.ic_close} style={styles.iconClose} />
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
					<Text style={styles.cancelText}>Cancel</Text>
				</TouchableOpacity>
				<TouchableOpacity style={styles.removeButton} onPress={handleRemove}>
					<Text style={styles.removeText}>Remove</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default RemoveProject;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderTopLeftRadius: 12,
		borderTopRightRadius: 12,
		padding: 20,
		width: '100%',
	},
	title: {
		color: Colors.black,
		fontSize: 16,
		flex: 1,
		textAlign: 'center',
	},
	iconClose: {
		width: 24,
		height: 24,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 20,
	},
	cancelText: {
		fontSize: 16,
		color: Colors.darkGray,
	},
	cancelButton: {
		borderWidth: 1,
		borderColor: Colors.underline,
		borderRadius: 24,
		flex: 1,
		paddingVertical: 14,
		maxWidth: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	removeButton: {
		borderRadius: 24,
		backgroundColor: Colors.borderRed,
		flex: 1,
		paddingVertical: 14,
		maxWidth: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	removeText: {
		fontSize: 16,
		color: Colors.white,
	},
});
