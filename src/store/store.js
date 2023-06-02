import { configureStore, combineReducers } from '@reduxjs/toolkit';

import contactSlice from './contactSlice';
import userSlice from './userSlice';

const combinedReducer = combineReducers({
  user: userSlice,
  contacts: contactSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'user/logout/fulfilled') {
    state = undefined;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});
export default store;
