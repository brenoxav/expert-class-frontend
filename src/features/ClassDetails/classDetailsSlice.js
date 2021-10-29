/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  classObj: [],
  status: 'idle',
  error: null,
};

export const fetchClassDetails = createAsyncThunk(
  'classes/fetchClassDetails', async (id) => {
    try {
      const response = await axios.get(`https://expert-class-backend.herokuapp.com/api/v1/courses/${id}`, { withCredentials: true });
      return response;
    } catch (error) {
      return error.message;
    }
  },
);

export const classDetailsSlice = createSlice({
  name: 'classDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClassDetails.fulfilled, (state, action) => {
        if (action.payload.statusText === 'OK') {
          state.status = 'idle';
          state.classObj = action.payload.data;
        } else {
          state.status = 'idle';
          state.error = 'Request failed';
        }
      })
      .addCase(fetchClassDetails.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching class details';
      });
  },
});

export default classDetailsSlice.reducer;
