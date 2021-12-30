export const authInitState = {};

export const authReducer = (state = authInitState, action) => {
  switch (action?.type) {
    case 'LOGIN':
      return {};
    default:
      return authInitState;
  }
};
