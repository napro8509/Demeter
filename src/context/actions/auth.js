/* eslint-disable prettier/prettier */
import { AuthApi } from '../../services/api';
import { LOGIN_SUCCESS } from './types';

export const login =
	({ password, username }) =>
		dispatch => {
			console.log("ENTRY")
			AuthApi.login(username, password).then(data => {
				dispatch({
					type: LOGIN_SUCCESS,
					payload: {
						accessToken: data?.login?.accessToken
					},
				});
			}).catch(err => console.log(err))
		};
