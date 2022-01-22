import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../assets/colors';
import Images from '../assets/images';
import AppNavigator from '../navigation/AppNavigator';
import SwitchProject from '../popup/SwitchProject';

const HomeScreen = ({ navigation }) => {
	const handleAddProject = () => {
		navigation.navigate('SelectProjectScreen');
	};

	const handleSwitchProject = () => {
		AppNavigator.showBottom({
			screen: SwitchProject,
		});
	};

	return (
		<SafeAreaView style={styles.flex}>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleSwitchProject}>
						<Text style={styles.projectName}>Empty Project</Text>
					</TouchableOpacity>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={handleAddProject}>
							<Image source={Images.ic_add} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={Images.ic_map} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={Images.ic_more} style={styles.icon} />
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
	},
	flex: {
		backgroundColor: Colors.white,
		flex: 1,
	},
	header: {
		alignItems: 'center',
		flexDirection: 'row',
		marginTop: 20,
	},
	headerRight: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	icon: {
		height: 32,
		marginLeft: 10,
		width: 32,
	},
	projectName: {
		color: Colors.black,
		flex: 1,
		fontSize: 26,
		fontWeight: 'bold',
	},
});
