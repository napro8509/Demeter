import React, { memo } from 'react';
import {
	Dimensions,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	View,
} from 'react-native';
import { ifIphoneX } from 'react-native-iphone-x-helper';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const Flex = props => {
	const {
		keyboardVerticalOffset,
		backgroundColor,
		keyboardAvoidView,
		containerStyle,
		scrollable,
		style,
		headerBackground,
		headerBackgroundStyle,
		children,
		getContainerRef,
	} = props;
	const Container = keyboardAvoidView ? KeyboardAvoidingView : View;
	const styleOS = {
		flex: 1,
		paddingBottom: !scrollable && ifIphoneX() ? 14 : 0,
	};

	return (
		<Container
			ref={ref => getContainerRef?.(ref)}
			style={styles.flex}
			behavior={Platform.OS === 'ios' ? 'padding' : null}
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			{scrollable ? (
				<ScrollView
					{...props}
					contentInset={{
						top: 0,
						left: 0,
						bottom: ifIphoneX() ? 14 : 0,
						right: 0,
					}}
					style={style}
					showsVerticalScrollIndicator={false}
				>
					{children}
				</ScrollView>
			) : (
				<View {...props} style={style}>
					{children}
				</View>
			)}
		</Container>
	);
};

export default memo(Flex);

const styles = StyleSheet.create({
	flex: {
		flex: 1,
	},
});

Flex.defaultProps = {
	keyboardVerticalOffset: 0,
	keyboardAvoidView: true,
	scrollable: false,
};
