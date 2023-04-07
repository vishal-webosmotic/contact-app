import { configureStore } from '@reduxjs/toolkit';

import contactSlice from './contactSlice';
import userSlice from './userSlice';

const store = configureStore({
  reducer: {
    user: userSlice,
    contacts: contactSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
