import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getCurrentUser, { getData, setStorage } from '../services/storage';
import fakePromise from '../services/utils';

const initialState = {
  user: '',
  error: [],
  loading: true,
  isLogoutLoader: false,
  // status: "idle",
  // contacts: null,
};

export const fetchContent = createAsyncThunk('user/init', async () => {
  await fakePromise();
  const data = getCurrentUser();
  // console.log('data', { data });
  if (!data) {
    // eslint-disable-next-line no-throw-literal
    throw 'fetch content error';
  }
  return data;
});

export const login = createAsyncThunk('user/login', async (item) => {
  await fakePromise();
  const { email, password } = item;
  const localStorageData = getData('user');
  const result = localStorageData.find(
    (item) => item.email === email && item.password === password
  );

  if (result) {
    localStorage.setItem('currentUser', email);
    return result.email;
  }
  throw new Error('User not found');
});

export const singUp = createAsyncThunk(
  'user/singUp',
  async (obj, { getState }) => {
    await fakePromise();
    const localStorageData = getData('user');
    const result = localStorageData.some((item) => item.email === obj.email);
    if (!result) {
      localStorageData.push(obj);
      setStorage('user', localStorageData);
      return obj;
    }
    throw new Error('email is already exists signup with different email');
  }
);

export const clearError = createAsyncThunk('user/clearError', async () => {
  return true;
});

export const logout = createAsyncThunk(
  'user/logout',
  async (_, { getState }) => {
    await fakePromise();
    const { user } = getState();
    return user;
  }
);

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
      .addCase(singUp.fulfilled, (state, action) => {
        state.error = [];
      })
      .addCase(singUp.rejected, (state, action) => {
        // state.error = payload;
        state.error = action.error.message;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state, action) => {
        state.loading = true;
        state.isLogoutLoader = true;
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogoutLoader = false;
        state.user = null;
        localStorage.removeItem('currentUser');
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.isLogoutLoader = false;
        state.error = action.error.message;
      })
      .addCase(clearError.fulfilled, (state) => {
        state.error = [];
      });
  },
});

export const { contactInfo } = userSlice.actions;

export default userSlice.reducer;
// export const getPostsStatus = (state) => state.user.status;
