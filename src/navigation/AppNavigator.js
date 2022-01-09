let loadingRef;

function setLoadingRef(ref) {
	loadingRef = ref;
}

function showLoading() {
	loadingRef?.showLoading?.();
}

function hideLoading() {
	loadingRef?.hideLoading?.();
}

export default {
	showLoading,
	hideLoading,
	setLoadingRef,
};
