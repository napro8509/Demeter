import React, { memo, useEffect, useRef } from 'react';
import {
	Animated,
	BackHandler,
	KeyboardAvoidingView,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Colors from '../assets/colors';
import DeviceHelper from '../utils/DeviceHelper';

const DialogScreen = ({ navigation, route }) => {
	const { params } = route || {};
	const routeParams = params || {};
	const ScreenComp = routeParams.screen;
	const closeOnTouchOutside = routeParams?.closeOnTouchOutside;
	const { useKeyboard = true } = routeParams || {};
	const isBottomSheet = routeParams?.position === 'bottom';
	const isPicker = routeParams?.position === 'picker';
	const animateBottom = useRef(new Animated.Value(0)).current;
	const handlePressOutSide = () => {
		if (closeOnTouchOutside) {
			handleRequestClose();
		}
	};

	const handleRequestClose = () => {
		hideAnimated(() => {
			if (navigation?.canGoBack?.()) {
				navigation?.goBack?.();
			}
		});
	};

	const translateY = animateBottom.interpolate({
		inputRange: [0, 1],
		outputRange: [500, 0],
	});

	const translateX = animateBottom.interpolate({
		inputRange: [0, 1],
		outputRange: [DeviceHelper.screenWidth, 1],
	});

	const showAnimated = () => {
		Animated.timing(animateBottom, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true,
		}).start();
	};

	const hideAnimated = callback => {
		Animated.timing(animateBottom, {
			toValue: 0,
			duration: 200,
			useNativeDriver: true,
		}).start(callback);
	};

	useEffect(() => {
		showAnimated();
	}, []);

	useEffect(() => {
		BackHandler.addEventListener('hardwareBackPress', handleBackButton);
		return () => {
			BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
		};
	}, []);

	const handleBackButton = () => {
		handleRequestClose();
		return true;
	};

	const getAnimation = () => {
		switch (routeParams?.position) {
			case 'bottom':
				return { translateY };
			case 'drawer':
				return { translateX };
			case 'picker':
				return { scale: 1 };
			default:
				return { scale: animateBottom };
		}
	};

	const Wrapper = closeOnTouchOutside ? TouchableWithoutFeedback : React.Fragment;
	const closeProps = {
		onPress: handlePressOutSide,
		style: styles.container,
	};
	const viewProps = closeOnTouchOutside ? closeProps : {};

	const renderContent = () => (
		<Animated.View
			style={[
				styles.modal,
				isBottomSheet ? styles.flexEnd : {},
				{ transform: [getAnimation()] },
			]}
		>
			<ScreenComp {...params} requestClose={handleRequestClose} />
		</Animated.View>
	);

	const renderWrapper = () => {
		if (DeviceHelper.isIOS() && useKeyboard) {
			return (
				<KeyboardAvoidingView
					style={styles.full}
					keyboardVerticalOffset={0}
					behavior='padding'
				>
					{renderContent()}
				</KeyboardAvoidingView>
			);
		}
		return renderContent();
	};

	return (
		<View style={styles.container(isPicker)}>
			<Wrapper {...viewProps}>{renderWrapper()}</Wrapper>
		</View>
	);
};

export default memo(DialogScreen);

const styles = StyleSheet.create({
	container: isPicker => ({
		flex: 1,
		backgroundColor: isPicker ? Colors.transparent : 'rgba(0,0,0,0.7)',
	}),
	flexEnd: {
		justifyContent: 'flex-end',
	},
	full: {
		flex: 1,
	},
	modal: {
		alignItems: 'center',
		backgroundColor: Colors.transparent,
		flex: 1,
		justifyContent: 'center',
	},
});
