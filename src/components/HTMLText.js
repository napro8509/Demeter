/* eslint-disable react-native/no-unused-styles */
import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import HTMLView from 'react-native-htmlview';
import Colors  from '../assets/colors';

const HTMLText = ({ children, style, containerStyle }) => (
	<View style={containerStyle}>
		<HTMLView value={`<div>${children}</div>`} stylesheet={{ ...styles, ...style }} />
	</View>
);

export default memo(HTMLText);

const styles = StyleSheet.create({
	b: {},
	div: {
		color: Colors.white,
	},
	highlight: {
		color: Colors.green,
	},
});
