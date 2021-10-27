/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expertClassAPI from '../../app/expertClassAPI';

const initialState = {
  classObj: [],
  status: 'idle',
  error: null,
};

export const removeClass = createAsyncThunk(
  'classes/removeClass', async (id) => {
    try {
      const response = await expertClassAPI.delete(`/api/v1/courses/${id}`);
      return response;
    } catch (error) {
      return error.message;
    }
  },
);

export const reloadClasses = createAsyncThunk(
  'classes/reloadClasses', async () => {
    try {
      const response = await expertClassAPI.get('/api/v1/courses/');
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
