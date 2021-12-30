import React, {createContext, useReducer} from 'react';
import {authInitState, authReducer} from './reducers/auth';

export const GlobalContext = createContext({});

export const GlobalProvider = ({children}) => {
  const [authState, authDispatch] = useReducer(authReducer, authInitState);

  return (
    <GlobalContext.Provider
      value={{
        authState,
        authDispatch,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
