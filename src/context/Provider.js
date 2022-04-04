import React, { useReducer } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { authInitState, authReducer } from './reducers/auth';
import { createContext } from 'use-context-selector';
import { projectInitState, projectReducer } from './reducers/project';
import { LOGIN_SUCCESS } from './actions/types';

export const GlobalContext = createContext({});

export const middleware = (state, dispatchMiddleware) => {
	return state => action => dispatch => {
		switch (action.type) {
			case LOGIN_SUCCESS:
				// Get new mesages from payload and push into receviewMessages
				// let rMessages = state.receivedMessages;
				// rMessages.push(action.payload);
				console.log('AAAAAA');
				// Tel reducer to save new recevied messages
				dispatch({ type: LOGIN_SUCCESS, payload: action.payload });
				break;

			case 'NEW_MESSAGE_SENT':
				// Pusblish message on websocket

				// Update the messages sent
				let sMessages = state.sentMessages;
				sMessages.push(action.payload);

				dispatch({ type: 'UPDATE_SENT_MESSAGES', payload: sMessages });
				break;
		}
	};
};

const reducerMiddleWare = (initialState, middleWare) => {
	// Define reducer
	const [authState, authDispatch] = useReducer(authReducer, authInitState);
	const [project, projectDispatch] = useReducer(projectReducer, projectInitState);
	// The middleware function
	const dispatchMiddleWare = action => {
		middleWare(authState, dispatchMiddleWare)(authState)(action)(authDispatch);
	};

	const dispatchProjectMiddleWare = action => {
		middleWare(project, dispatchMiddleWare)(project)(action)(projectDispatch);
	};

	// Instade of dispatch returns "dispatchMiddleware"
	return {
		authState,
		dispatchMiddleWare,
		project,
		dispatchProjectMiddleWare,
	};
};

export const GlobalProvider = ({ initialState, children }) => {
	return (
		<GlobalContext.Provider value={reducerMiddleWare(initialState, middleware)}>
			{children}
		</GlobalContext.Provider>
	);
};
