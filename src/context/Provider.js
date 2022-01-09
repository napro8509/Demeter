import React, { useReducer } from 'react';
import { useLayoutEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { authInitState, authReducer } from './reducers/auth';
import { createContext } from 'use-context-selector';
const CONTEXT_LISTENERS =
	process.env.NODE_ENV !== 'production' ? Symbol('CONTEXT_LISTENERS') : Symbol();

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
	const [authState, authDispatch] = useReducer(authReducer, authInitState);

	return (
		<GlobalContext.Provider
			value={{
				authState,
				authDispatch,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
