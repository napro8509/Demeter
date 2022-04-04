import {
	useGetProjectsLazyQuery,
	useGetDevicesLazyQuery,
	useGetGroupsLazyQuery,
} from '@graphql/generated/graphql';
import useDispatch from '../context/useDispatch';
import React, { useEffect, useRef, useState } from 'react';
import {
	DeviceEventEmitter,
	Image,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../assets/colors';
import Images from '../assets/images';
import AppNavigator from '../navigation/AppNavigator';
import SwitchProject from '../popup/SwitchProject';
import DeviceHelper from '../utils/DeviceHelper';
import { UPDATE_PROJECTS } from '@context/actions/types';

const HomeScreen = ({ navigation }) => {
	const [activeTab, setActiveTab] = useState('ALl');
	const [selectedProject, setSelectedProject] = useState({});
	const [groups, setGroups] = useState([]);
	const projects = useRef();
	const allGroups = useRef([]);
	const [getProjects] = useGetProjectsLazyQuery();
	const [getDevices] = useGetDevicesLazyQuery();
	const [getGroups] = useGetGroupsLazyQuery();
	const dispatch = useDispatch('dispatchProjectMiddleWare');

	const allDevices = selectedProject?.devices || [];
	const [devices, setDevices] = useState([]);
	useEffect(() => {
		handleGetProject();
		getDevices({
			onCompleted: handleGetDeviceSuccess,
		});
	}, []);

	const handleGetDeviceSuccess = response => {
		if (response?.devices?.length > 0) {
			setDevices(response?.devices);
		}
	};

	useEffect(() => {
		if (selectedProject?.id) {
			setGroups(allGroups.current?.filter(item => item.projectId === selectedProject?.id));
		}
	}, [selectedProject]);

	useEffect(() => {
		DeviceEventEmitter.addListener('UPDATE_PROJECT', handleGetProject);
	}, []);

	const handleGetProject = () => {
		getProjects({
			onCompleted: response => {
				console.log(JSON.stringify(response));
				if (response?.projects?.length > 0) {
					projects.current = response?.projects;
					setSelectedProject(response?.projects?.[0]);
					dispatch({
						type: UPDATE_PROJECTS,
						payload: response?.projects,
					});
				}
				getGroups({
					onCompleted: handleGetGroupsSuccess,
				});
			},
		});
	};

	const handleGetGroupsSuccess = groupData => {
		console.log(groupData.groups);
		if (groupData?.groups?.length > 0) {
			allGroups.current = groupData?.groups;
			setGroups(groupData?.groups.filter(item => item?.projectId === selectedProject?.id));
		}
	};

	const handleAddProject = () => {
		navigation.navigate('AddDevice');
	};

	const handleChangeProject = item => {
		setSelectedProject(item);
	};

	const handleSwitchProject = () => {
		AppNavigator.showBottom({
			screen: SwitchProject,
			onManageProject: handleManageProject,
			onSelectProject: handleChangeProject,
			params: {
				projects: projects?.current,
				selectedProject,
			},
		});
	};

	const handleManageProject = () => {
		navigation.navigate('ManageProjects', {
			projects: projects.current,
		});
	};

	const handleManageZone = () => {
		navigation.navigate('ManageZones', {
			projectId: selectedProject?.id,
			groups: selectedProject?.groups || [],
		});
	};

	const handleGoDeviceControl = id => {
		navigation.navigate('DeviceSwitch', {
			deviceId: id,
		});
	};

	const handleRegisterDevice = () => {
		navigation.navigate('SetUpDevice');
	};

	const tabList = [
		{
			id: 'ALL',
			name: 'My Devices',
		},
		...groups,
	];

	return (
		<SafeAreaView style={styles.flex}>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleSwitchProject} style={styles.projectButton}>
						<Text style={styles.projectName} numberOfLines={1}>
							{selectedProject?.name || 'Empty Project'}
						</Text>
						<Image
							source={Images.ic_arrow_down}
							style={styles.arrowDown}
							resizeMode='contain'
						/>
					</TouchableOpacity>
					<View style={styles.headerRight}>
						<TouchableOpacity onPress={handleAddProject}>
							<Image source={Images.ic_add} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity>
							<Image source={Images.ic_map} style={styles.icon} />
						</TouchableOpacity>
						<TouchableOpacity onPress={handleManageProject}>
							<Image source={Images.ic_more} style={styles.icon} />
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.cameraBlock}>
					<Image source={Images.ic_camera_new} style={styles.iconCamera} />
					<Text style={styles.cameraText}>You have 3 cameras</Text>
					<TouchableOpacity onPress={handleRegisterDevice}>
						<Text style={styles.viewText}>View</Text>
					</TouchableOpacity>
				</View>
				<View style={styles.view}>
					<ScrollView
						horizontal
						contentContainerStyle={styles.contentStyle}
						style={styles.scrollView}
						showsHorizontalScrollIndicator={false}
					>
						{tabList.map(item => (
							<TouchableOpacity onPress={() => setActiveTab(item.id)} key={item.id}>
								<Text style={styles.tab(activeTab === item.id)}>{item?.name}</Text>
							</TouchableOpacity>
						))}
					</ScrollView>
					<TouchableOpacity onPress={handleManageZone}>
						<Image source={Images.ic_menu} style={styles.iconMenu} />
					</TouchableOpacity>
				</View>
				<View style={styles.rowBlock}>
					{devices.map(item => (
						<TouchableOpacity
							onPress={() => handleGoDeviceControl(item.id)}
							style={{ marginTop: 12 }}
						>
							<Image source={Images.img_light_demo} style={styles.demoLight} />
						</TouchableOpacity>
					))}
				</View>
				{/* <TouchableOpacity>
					<Image source={Images.img_demo_indoor_camera} style={styles.demoIndoor} />
				</TouchableOpacity> */}
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
		justifyContent: 'space-between',
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
		fontSize: 26,
		fontWeight: 'bold',
		flex: 1,
	},
	arrowDown: {
		width: 20,
		height: 20,
		marginLeft: 6,
	},
	projectButton: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	iconCamera: {
		width: 20,
		height: 20,
	},
	cameraText: {
		fontSize: 15,
		color: Colors.black,
		marginLeft: 4,
		flex: 1,
	},
	cameraBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.veryLightGreen,
		borderRadius: 4,
		padding: 16,
		marginTop: 24,
	},
	viewText: {
		fontSize: 13,
		color: Colors.green,
	},
	tab: isActive => ({
		fontSize: 17,
		fontWeight: 'bold',
		color: isActive ? Colors.green : Colors.gray,
		marginRight: 10,
	}),
	contentStyle: {
		paddingVertical: 16,
	},
	view: {
		flexDirection: 'row',
		alignItems: 'center',
		borderBottomWidth: 1,
		borderColor: Colors.underline,
	},
	iconMenu: {
		width: 32,
		height: 32,
	},
	scrollView: {
		marginRight: 16,
	},
	rowBlock: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginTop: 24,
		flexWrap: 'wrap',
	},
	demoLight: {
		width: (DeviceHelper.screenWidth - 56) / 2,
		height: ((DeviceHelper.screenWidth - 56) / 2 / 160) * 114,
	},
	demoIndoor: {
		width: DeviceHelper.screenWidth - 40,
		height: ((DeviceHelper.screenWidth - 40) / 335) * 114,
		marginTop: 16,
	},
});
