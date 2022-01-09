import { HeaderBackButton } from '@react-navigation/elements';
import { useLayoutEffect } from 'react';
import { Colors } from '../assets/colors';
import React, { Component } from 'react';

function useHeader(navigation) {
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => <HeaderBackButton tintColor={Colors.black} onPress={handleGoBack} />,
		});
	}, [navigation]);

	const handleGoBack = () => {
		if (navigation?.canGoBack?.()) {
			navigation?.goBack?.();
		}
	};
}

export default useHeader;
