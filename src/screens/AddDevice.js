import React, { useEffect, useState } from 'react';
import {
	Button,
	FlatList,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import Flex from '@components/Flex';
import { Colors, Images } from '@assets';
import useHeader from '@hooks/useHeader';
import { useNavigation } from '@react-navigation/native';

const categoryList = ['Power Switch', 'Nutrient Control...', 'Sensor', 'Camera'];

const AddDevice = () => {
	const navigation = useNavigation();
	useHeader(navigation);

	const [categorySelected, setCategorySelected] = useState(undefined);

	const handleConnectWifi = () => {
		navigation.navigate('ConnectWifi');
	};

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => (
				<View style={styles.rightContainer}>
					<TouchableOpacity style={styles.qrIcon}>
						<Image source={Images.ic_qr_code} style={styles.icon} />
					</TouchableOpacity>
					<TouchableOpacity onPress={handleConnectWifi}>
						<Image source={Images.ic_wifi} style={styles.icon} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	const renderKeyCategory = (item, index) => index.toString();

	const renderDeviceCategory = ({ item, index }) => (
		<TouchableOpacity
			style={styles.category(item === categorySelected)}
			onPress={() => setCategorySelected(item)}
		>
			<Text style={styles.categoryText(item === categorySelected)} numberOfLines={2}>
				{item}
			</Text>
		</TouchableOpacity>
	);

	const renderHeader = () => (
		<View style={styles.headerRow}>
			<View style={styles.separatorLine} />
			<Text style={styles.text}>Wifi Switch</Text>
			<View style={styles.separatorLine} />
		</View>
	);

	const renderDevice = () => (
		<TouchableOpacity style={styles.deviceContainer}>
			<Image source={Images.ic_device_switch} style={styles.iconSwitch} />
			<Text style={styles.deviceName}>Wifi Socket</Text>
		</TouchableOpacity>
	);

	const renderKeyDevice = (item, index) => index.toString();

	return (
		<Flex style={styles.container}>
			<View style={styles.row}>
				<View style={styles.portraitLine} />
				<View style={styles.leftPanel}>
					<FlatList
						renderItem={renderDeviceCategory}
						data={categoryList}
						keyExtractor={renderKeyCategory}
					/>
				</View>
				<View style={styles.rightPanel}>
					<FlatList
						renderItem={renderDevice}
						data={[1]}
						keyExtractor={renderKeyDevice}
						ListHeaderComponent={renderHeader}
					/>
				</View>
			</View>
		</Flex>
	);
};

export default AddDevice;

const styles = StyleSheet.create({
	container: {
		flex: 1,
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
	row: {
		flexDirection: 'row',
		flex: 1,
		marginTop: 20,
	},
	leftPanel: {
		width: 80,
		backgroundColor: Colors.white,
	},
	rightPanel: {
		backgroundColor: Colors.white,
		flex: 1,
		marginLeft: 20,
		paddingRight: 16,
	},
	category: selected => ({
		backgroundColor: selected ? Colors.lightGray : Colors.white,
		paddingVertical: 9,
		paddingHorizontal: 12,
		height: 56,
		width: 80,
		borderTopRightRadius: selected ? 8 : 0,
		borderBottomRightRadius: selected ? 8 : 0,
	}),
	categoryText: selected => ({
		fontSize: 14,
		fontWeight: 'bold',
		color: selected ? Colors.green : Colors.gray,
	}),
	portraitLine: {
		width: 16,
		backgroundColor: Colors.lightGray,
	},
	text: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.midGray,
		marginHorizontal: 10,
	},
	separatorLine: {
		height: 1,
		flex: 1,
		backgroundColor: Colors.border,
	},
	headerRow: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	iconSwitch: {
		width: 45,
		height: 45,
	},
	deviceName: {
		fontSize: 12,
		fontWeight: '500',
		color: Colors.midGray,
		textAlign: 'center',
	},
	deviceContainer: {
		alignItems: 'center',
		width: 45,
	},
});
