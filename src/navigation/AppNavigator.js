import { Keyboard } from 'react-native';

let loadingRef;
let navigator;
function setLoadingRef(ref) {
	loadingRef = ref;
}

function showLoading() {
	loadingRef?.showLoading?.();
}

function hideLoading() {
	loadingRef?.hideLoading?.();
}

function setRootNavigator(navigationRef) {
	navigator = navigationRef;
}

function navigate(name, params = {}, key = `${name}_${new Date().getTime()}`) {
	Keyboard.dismiss();
	if (navigator) {
		const delayTime = navigator?.getRootState() ? 0 : 500;
		setTimeout(() => {
			if (navigator?.getRootState()) {
				navigator.navigate({
					name,
					params,
					key,
				});
			}
		}, delayTime);
	}
}

function showBottom(params) {
	Keyboard.dismiss();
	params.position = 'bottom';
	navigate('Dialog', params);
}

export default {
	showLoading,
	hideLoading,
	setLoadingRef,
	setRootNavigator,
	showBottom,
};
