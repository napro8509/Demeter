import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Flex from '@components/Flex';
import { Colors, Images } from '@assets';
import { useHeader } from '@hooks';
import { useUpdateThingStateMutation } from '@graphql/generated/graphql';

const DeviceSwitch = ({ navigation, route }) => {
	const { deviceId } = route?.params || {};
	const [updateThing] = useUpdateThingStateMutation();
	useHeader(navigation);
	const [isEnabled, setEnabled] = useState(false);
	const handleEnable = () => {
		updateThing({
			variables: {
				thingName: deviceId,
				input: {
					fields: [
						{
							key: 'switch',
							value: !isEnabled ? 'on' : 'off',
						},
					],
				},
			},
			onCompleted: () => {
				setEnabled(!isEnabled);
			},
		});
	};

	return (
		<Flex style={styles.container}>
			<Image style={styles.image} source={Images.img_device_swithc} />
			<View style={styles.actionBottom}>
				<TouchableOpacity>
					<Image source={Images.ic_timer} style={styles.iconClock} />
				</TouchableOpacity>
				<TouchableOpacity onPress={handleEnable}>
					<Image
						source={isEnabled ? Images.ic_power_on : Images.ic_power_off}
						style={styles.iconClock}
					/>
				</TouchableOpacity>
				<TouchableOpacity>
					<Image source={Images.ic_history} style={styles.iconClock} />
				</TouchableOpacity>
			</View>
		</Flex>
	);
};

export default DeviceSwitch;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	iconClock: {
		width: 80,
		height: 80,
	},
	image: {
		width: 200,
		height: 200,
		alignSelf: 'center',
		marginTop: 50,
	},
	actionBottom: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-around',
		flex: 1,
	},
});
