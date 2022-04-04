import { LOGIN_SUCCESS, UPDATE_PROJECTS } from '../actions/types';

export const projectInitState = {
	projects: [],
};

export const projectReducer = (state = projectInitState, action) => {
	const { type, payload } = action || {};
	switch (type) {
		case UPDATE_PROJECTS:
			return {
				...state,
				projects: payload,
			};
		default:
			return projectInitState;
	}
};
