import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import getCurrentUser, {
  getData,
  setLocalStorage,
  getDataById,
} from '../services/storage';
import fakePromise from '../services/utils';

const initialState = {
  contacts: [],
  status: 'idle',
  contact: [],
  isLoad: false,
  isUpdate: false,
  deletingId: '',
};

export const contactList = createAsyncThunk(
  'contact/contactList',
  async (_, { getState }) => {
    await fakePromise();
    const state = getState();
    let { user } = state.user;
    const localStorageData = getData(user);
    return localStorageData;
  }
);

export const contactAdd = createAsyncThunk(
  'contact/contactAdd',
  async (obj, { getState }) => {
    await fakePromise();
    const { id } = obj;
    if (id) {
      let allContacts = getData(getCurrentUser());
      allContacts.splice(
        allContacts.findIndex((item) => item.id.toString() === id.toString()),
        1,
        obj
      );
      setLocalStorage(allContacts);
    } else {
      const newId = Math.floor(Math.random() * 1000);
      obj.id = newId;
      const localStorageData = getData(getCurrentUser());
      localStorageData.push(obj);
      setLocalStorage(localStorageData);
    }
    return obj;
  }
);

export const contactDelete = createAsyncThunk(
  'contact/contactDelete',
  async (id, { getState }) => {
    await fakePromise();
    let { contacts, deletingId } = getState();
    deletingId = id;
    console.log(deletingId);
    const afterDelete = contacts.contacts.filter((item) => {
      return item.id !== id;
    });
    setLocalStorage(afterDelete);
    return afterDelete;
  }
);
export const clearData = createAsyncThunk('contact/contactData', () => {
  return true;
});

export const contactDetailsField = createAsyncThunk(
  'contact/contactDetailsField',
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
        state.isUpdate = true;
      })
      .addCase(contactAdd.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.isUpdate = false;
        state.status = 'succeeded';
      })
      .addCase(contactAdd.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(contactDelete.pending, (state, action) => {
        state.deletingId = action.meta.arg;
      })
      .addCase(contactDelete.fulfilled, (state, { payload }) => {
        state.contacts = payload;
        state.deletingId = '';
      })
      .addCase(contactDetailsField.fulfilled, (state, { payload }) => {
        state.contact = payload;
      })
      .addCase(clearData.pending, (state, { payload }) => {
        state.isLoad = true;
      })
      .addCase(clearData.fulfilled, (state, { payload }) => {
        state.isLoad = false;
        state.contact = [];
      });
  },
});
export default contactSlice.reducer;
