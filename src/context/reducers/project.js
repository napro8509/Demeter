import { LOGIN_SUCCESS } from '../actions/types';

export const projectInitState = {
	accessToken: '',
};

export const projectReducer = (state = projectInitState, action) => {
	const { type, payload } = action || {};
	switch (type) {
		case LOGIN_SUCCESS:
			return {
				...state,
			};
		case 'HELLO':
			console.log('OKOKOKO', payload);
			return {
				...state,
			};
		default:
			return projectInitState;
	}
};
