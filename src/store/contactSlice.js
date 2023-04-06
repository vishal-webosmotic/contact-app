import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import fakePromise from '../services/fakePromise';
import getCurrentUser, {
  getData,
  setLocalStorage,
  getDataById,
} from '../services/storage';

const initialState = {
  contacts: [],
  status: 'idle',
  contact: [],
};

export const contactList = createAsyncThunk(
  'contact/contactList',
  async (_, { getState }) => {
    await fakePromise();
    const state = getState();
    // console.log(state, "{{{{");
    let { user } = state.user;
    // console.log("line 23 email", user);
    const localStorageData = getData(user);
    return localStorageData;
  }
);

export const contactAdd = createAsyncThunk(
  'contact/contactAdd',
  async (obj) => {
    return obj;
  }
);

export const contactDelete = createAsyncThunk(
  'contact/contactDelete',
  async (id, { getState }) => {
    const { contacts } = getState();

    const afterDelete = contacts.contacts.filter((item) => {
      return item.id !== id;
    });
    setLocalStorage(afterDelete);
    return afterDelete;
  }
);

export const contactUpdate = createAsyncThunk(
  'contact/contactUpdate',
  async (id) => {
    const contact = getDataById(id);
    return contact;
  }
);
export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(contactList.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(contactList.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.contacts = payload;
        // console.log(payload, 'contactList');
      })
      .addCase(contactList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
    builder
      .addCase(contactAdd.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(contactAdd.fulfilled, (state, { payload }) => {
        const id = Math.floor(Math.random() * 1000);
        payload.id = id;
        const localStorageData = getData(getCurrentUser());
        localStorageData.push(payload);
        setLocalStorage(localStorageData);
        state.status = 'succeeded';
        state.contacts = localStorageData;
      })
      .addCase(contactAdd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(contactDelete.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      .addCase(contactUpdate.fulfilled, (state, { payload }) => {
        state.contact = payload;
      });
  },
});
export default contactSlice.reducer;
