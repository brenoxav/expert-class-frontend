/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import getCSRFToken from '../../app/getCSRFToken';

const initialState = {
  classObj: [],
  status: 'idle',
  error: null,
};

export const removeClass = createAsyncThunk(
  'classes/removeClass', async (id) => {
    try {
      const response = await axios.delete(`https://expert-class-backend.herokuapp.com/api/v1/courses/${id}`,
        {
          withCredentials: true,
          // headers: {
          //   'X-CSRF-Token': getCSRFToken(),
          // },
        });
      return response;
    } catch (error) {
      return error.message;
    }
  },
);

export const reloadClasses = createAsyncThunk(
  'classes/reloadClasses', async () => {
    try {
      const response = await axios.get('https://expert-class-backend.herokuapp.com/api/v1/courses/', { withCredentials: true });
      return response;
    } catch (error) {
      return error.message;
    }
  },
);

export const removeClassSlice = createSlice({
  name: 'removeClass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reloadClasses.fulfilled, (state, action) => {
        state.classObj = action.payload.data;
      });
  },
});

export default removeClassSlice.reducer;
