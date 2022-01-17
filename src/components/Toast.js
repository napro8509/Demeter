import { Colors } from '@assets';
import { useStateCallback } from '@hooks';
import React, { forwardRef, memo, useImperativeHandle, useRef, useState } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

const Toast = (props, ref) => {
	const [isDisplay, setDisplay] = useStateCallback(false);
	const [message, setMessage] = useStateCallback('');
	const [bottomPadding, setBottomPadding] = useStateCallback(100);
	const animate = useRef(new Animated.Value(0));
	const [customStyle, setCustomStyle] = useState({});
	useImperativeHandle(ref, () => ({
		show,
	}));

	const show = ({ title, bottom = 100, style = {} }) => {
		setMessage(title);
		setBottomPadding(bottom);
		setCustomStyle(style);
		setDisplay(true, () => {
			Animated.timing(animate.current, {
				toValue: 1,
				duration: 200,
				useNativeDriver: true,
			}).start(() => {
				setTimeout(() => {
					Animated.timing(animate.current, {
						toValue: 0,
						duration: 200,
						useNativeDriver: true,
					}).start(() => {
						setMessage('');
						setDisplay(false);
					});
				}, 1000);
			});
		});
	};

	if (isDisplay) {
		return (
			<Animated.View
				style={[
					styles.container,
					{ opacity: animate.current, bottom: bottomPadding },
					customStyle,
				]}
			>
				<Text style={styles.title}>{message}</Text>
			</Animated.View>
		);
	}
	return null;
};

export default memo(forwardRef(Toast));

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		alignSelf: 'center',
		backgroundColor: Colors.primary,
		borderRadius: 12,
		bottom: 100,
		height: 40,
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 12,
		position: 'absolute',
		zIndex: 1000,
	},
	title: {
		color: Colors.white,
		fontSize: 14,
		fontWeight: 'bold',
	},
});
