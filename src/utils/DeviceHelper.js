/* eslint-disable max-len */
import { Dimensions, PixelRatio, Platform } from 'react-native';

const dimensions = Dimensions.get('window');
const [shortDimension] =
	dimensions.width < dimensions.height
		? [dimensions.width, dimensions.height]
		: [dimensions.height, dimensions.width];
function isIOS() {
	return Platform.OS === 'ios';
}

function isAndroid() {
	return Platform.OS === 'android';
}

function isIphoneX() {
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTVOS &&
		(dimensions.height === 780 ||
			dimensions.width === 780 ||
			dimensions.height === 812 ||
			dimensions.width === 812 ||
			dimensions.height === 844 ||
			dimensions.width === 844 ||
			dimensions.height === 896 ||
			dimensions.width === 896 ||
			dimensions.height === 926 ||
			dimensions.width === 926)
	);
}

const perWidth = size => PixelRatio.roundToNearestPixel((shortDimension * size) / 100);

export default {
	isIOS,
	isIphoneX,
	dimensions,
	isAndroid,
	perWidth,
	screenWidth: dimensions.width,
	screenHeight: dimensions.height,
};
