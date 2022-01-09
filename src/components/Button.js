import React, { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../assets/colors';
import { DISABLED, LIGHT, OUTLINE } from '../constants';

const Button = ({ title, onPress, disabled, style, type, titleStyle, icon, iconStyle }) => (
	<TouchableOpacity
		style={[styles.container(type), style]}
		onPress={type === DISABLED ? undefined : onPress}
		activeOpacity={type === DISABLED ? 1 : 0.7}
	>
		{!!icon && <Image source={icon} style={[styles.iconStyle, iconStyle]} />}
		<Text style={[styles.buttonTitle(type), titleStyle]}>{title}</Text>
	</TouchableOpacity>
);

export default memo(Button);

const styles = StyleSheet.create({
	buttonTitle: type => {
		let color = Colors.white;
		if (type === LIGHT) {
			color = Colors.black;
		} else if (type === OUTLINE) {
			color = Colors.borderRed;
		}
		return {
			fontSize: 16,
			color,
			fontWeight: '500',
		};
	},
	container: type => {
		let backgroundColor = Colors.green;
		if (type === DISABLED) {
			backgroundColor = Colors.lightGray;
		} else if (type === OUTLINE) {
			backgroundColor = Colors.white;
		} else if (type === LIGHT) {
			backgroundColor = Colors.white;
		}
		return {
			borderRadius: 24,
			paddingVertical: 14,
			backgroundColor,
			alignItems: 'center',
			borderWidth: type === OUTLINE ? 1 : 0,
			borderColor: Colors.borderRed,
			flexDirection: 'row',
			justifyContent: 'center',
		};
	},
	iconStyle: {
		height: 24,
		marginRight: 10,
		width: 24,
	},
});
