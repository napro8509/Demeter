import { LOGIN_SUCCESS } from '../actions/types';

export const authInitState = {
	accessToken: '',
};

export const authReducer = (state = authInitState, action) => {
	const { payload } = action || {};
	switch (action?.type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				accessToken: payload.accessToken,
			};
		case 'HEHE':
		default:
			console.log('HELE');
			return authInitState;
	}
};
