import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { View, StyleSheet, BackHandler, ActivityIndicator } from 'react-native';
import { Colors } from '../assets/colors';

const styleCenter = {
	...StyleSheet.absoluteFillObject,
	position: 'absolute',
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	backgroundColor: '#00000080',
};

const transparent = {
	backgroundColor: Colors.transparent,
};

const Loading = (props, ref) => {
	const [visible, setVisible] = useState(false);
	let backHandler = useRef(null).current;

	useImperativeHandle(ref, () => ({
		showLoading,
		hideLoading,
	}));

	useEffect(
		() => () => {
			backHandler?.remove?.();
		},
		[]
	);

	const onBackPress = () => {
		if (visible) {
			return true;
		}
		return false;
	};

	const showLoading = () => {
		backHandler?.remove?.();
		backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);
		setVisible(true);
	};

	const hideLoading = () => {
		backHandler?.remove?.();
		setVisible(false);
	};

	if (!visible) return null;
	return (
		<View style={styleCenter} modalStyle={transparent}>
			<ActivityIndicator color={Colors.white} size='large' />
		</View>
	);
};

export default forwardRef(Loading);
