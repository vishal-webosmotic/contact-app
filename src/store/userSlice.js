import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import fakePromise from '../services/fakePromise';
import getCurrentUser, { getData } from '../services/storage';

const initialState = {
  user: '',
  error: [],
  loading: true,
  // status: "idle",
  // contacts: null,
};

export const fetchContent = createAsyncThunk('user/init', async () => {
  await fakePromise();
  const data = getCurrentUser();
  // console.log('data', { data });
  if (!data) {
    throw 'fetch content error';
  }
  return data;
});

export const login = createAsyncThunk('user/login', async (item) => {
  await fakePromise();
  const { email, password } = item;
  console.log(item);
  const localStorageData = getData('user');
  const result = localStorageData.find(
    (item) => item.email === email && item.password === password
  );
  if (result) {
    localStorage.setItem('currentUser', email);
    // console.log('returning', result);
    return result.email;
  }
  throw new Error('user not found');
});

export const logout = createAsyncThunk('user/logout', async () => {
  await fakePromise();
  if (localStorage.getItem('currentUser')) {
    localStorage.removeItem('currentUser');
  }
  // throw "error";
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loading = false;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { contactInfo } = userSlice.actions;

export default userSlice.reducer;
// export const getPostsStatus = (state) => state.user.status;
