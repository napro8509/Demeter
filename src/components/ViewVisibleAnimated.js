import { useStateCallback } from '@hooks';
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { Animated } from 'react-native';

// export type ViewVisibleAnimatedProps = {
//     scaleEnable?: Boolean,
//     autoHide?: Boolean,
//     onShowDone?: void,
//     onDone?: void,
//     onShowStart?: void,
//     style?: StyleProp<ViewStyle>,
//     delay?: Number,
//     duration?: Number,
//     timeout?: Number,
//     autoShow?: Boolean,
//     pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto',
//     scaleType?: 'in' | 'out',
//     renderHiddenContent?: any,
// };

const ViewVisibleAnimated = forwardRef(
	(
		{
			onShowStart,
			onShowDone,
			onDone,
			style,
			children,
			autoHide,
			scaleEnable,
			delay = 100,
			duration = 250,
			timeout = 3000,
			autoShow = true,
			pointerEvents = 'auto',
			scaleType = 'in',
			data,
			renderHiddenContent = null,
			disableHiddenContent = false,
		},
		ref
	) => {
		useImperativeHandle(ref, () => ({
			hide,
			show,
		}));
		const visibleAnimation = useRef(new Animated.Value(0)).current;
		const scaleAnimation = useRef(new Animated.Value(scaleType === 'in' ? 0 : 3)).current;
		const [visible, setVisible] = useStateCallback(false);
		let TIME_OUT;

		useEffect(() => {
			if (autoShow) {
				TIME_OUT = setTimeout(() => {
					show();
				}, delay);
			}
			return () => {
				TIME_OUT && clearTimeout(TIME_OUT);
			};
		}, []);

		useEffect(() => {
			setVisible(false, () => {
				setVisible(true);
			});
		}, [data]);

		const show = (callback, durationShow = delay) => {
			TIME_OUT && clearTimeout(TIME_OUT);
			TIME_OUT = setTimeout(() => {
				onShowStart?.();
				showAnimation(callback);
			}, durationShow);
		};

		const showAnimation = callback => {
			setVisible(true);
			Animated.timing(scaleAnimation, {
				toValue: 1,
				duration,
				useNativeDriver: true,
			}).start();
			Animated.timing(visibleAnimation, {
				toValue: 1,
				duration,
				useNativeDriver: true,
			}).start(() => {
				callback?.();
				onShowDone?.();
				if (autoHide) {
					TIME_OUT && clearTimeout(TIME_OUT);
					TIME_OUT = setTimeout(() => {
						hide(onDone);
					}, timeout);
				}
			});
		};

		const hide = (callback, durationHide = duration) => {
			Animated.timing(scaleAnimation, {
				toValue: scaleType === 'in' ? 0 : 3,
				duration: durationHide,
				useNativeDriver: true,
			}).start();
			Animated.timing(visibleAnimation, {
				toValue: 0,
				duration: durationHide,
				useNativeDriver: true,
			}).start(() => {
				setVisible(false);
				callback?.();
			});
		};

		return (
			<Animated.View
				style={[
					style,
					{
						opacity: visibleAnimation,
						transform: [{ scale: scaleEnable ? scaleAnimation : 1 }],
					},
				]}
				pointerEvents={visible ? pointerEvents : 'none'}
			>
				{children}
			</Animated.View>
		);
	}
);

export default ViewVisibleAnimated;
