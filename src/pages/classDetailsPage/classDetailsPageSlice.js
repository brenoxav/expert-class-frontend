/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expertClassApi from '../../app/expertClassApi';

const initialState = {
  classObj: [],
  status: 'idle',
  error: null,
};

export const fetchClassDetails = createAsyncThunk(
  'classes/fetchClassDetails', async (id) => {
    try {
      const response = await expertClassApi.get(`courses/${id}`);
      return response.data;
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
        state.status = 'fulfilled';
        state.classObj = action.payload;
      })
      .addCase(fetchClassDetails.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching class details';
      });
  },
});

export default classDetailsSlice.reducer;
