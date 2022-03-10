import React, { useState } from 'react';
import { forwardRef } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native';
import Colors from '../assets/colors';
import PropTypes from 'prop-types';
const Input = forwardRef(
	(
		{
			placeholder,
			onChangeText,
			leftIcon,
			rightIcon,
			leftIconStyle,
			rightIconStyle,
			containerStyle,
			showCheck,
			leftText,
			defaultValue,
			...otherProps
		},
		ref
	) => {
		const [text, setText] = useState(defaultValue || '');
		const [isFocused, setIsFocused] = useState(false);

		const handleFocus = () => {
			setIsFocused(true);
		};

		const handleBlur = () => {
			setIsFocused(false);
		};

		const handleChangeText = text => {
			setText(text);
			onChangeText?.(text);
		};

		return (
			<View style={[styles.container, containerStyle]}>
				<View style={styles.inputContainer}>
					{!!leftIcon && (
						<TouchableOpacity>
							<Image
								style={[styles.leftIconStyle, leftIconStyle]}
								source={leftIcon}
							/>
						</TouchableOpacity>
					)}
					{!!leftText && <Text style={styles.leftText}>{leftText}</Text>}
					<TextInput
						placeholder={placeholder}
						value={text}
						onChangeText={handleChangeText}
						onFocus={handleFocus}
						onBlur={handleBlur}
						style={[styles.inputStyle, leftText && { textAlign: 'right' }]}
						placeholderTextColor={Colors.midGray}
						{...otherProps}
					/>
					{(!!rightIcon || showCheck) && (
						<TouchableOpacity>
							<Image
								style={[
									styles.rightIconStyle,
									rightIconStyle,
									showCheck && styles.checkIconStyle,
								]}
								source={rightIcon}
							/>
						</TouchableOpacity>
					)}
				</View>
				<View style={styles.underline(isFocused)} />
			</View>
		);
	}
);

export default Input;

Input.propTypes = {
	placeholder: PropTypes.string,
	onChangeText: PropTypes.func,
	leftIcon: PropTypes.any,
	rightIcon: PropTypes.any,
	leftIconStyle: PropTypes.any,
	rightIconStyle: PropTypes.object,
	containerStyle: PropTypes.object,
	showCheck: PropTypes.bool,
	leftText: PropTypes.string,
	defaultValue: PropTypes.string,
};

const styles = StyleSheet.create({
	checkIconStyle: {
		height: 24,
		tintColor: '#0F62F9',
		width: 24,
	},
	container: {},
	floatingText: {
		color: '#0F62F9',
		fontSize: 12,
		lineHeight: 22,
		minHeight: 22,
	},
	inputContainer: {
		alignItems: 'center',
		flexDirection: 'row',
	},
	inputStyle: {
		color: Colors.black,
		flex: 1,
		fontSize: 16,
		fontWeight: '400',
	},
	leftIconStyle: {
		height: 16,
		marginRight: 8,
		width: 16,
	},
	leftText: {
		color: Colors.black,
		fontSize: 15,
	},
	underline: isFocused => ({
		width: '100%',
		height: 2,
		backgroundColor: isFocused ? Colors.green : Colors.underline,
		marginTop: 14,
	}),
});
