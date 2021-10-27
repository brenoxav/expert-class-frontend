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

export const removeClassSlice = createSlice({
  name: 'removeClass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(removeClass.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeClass.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = action.payload.message;
        } else {
          state.error = action.payload.message;
        }
      })
      .addCase(removeClass.rejected, (state, action) => {
        state.error = 'Failed';
        state.status = action.payload.message;
      });
  },
});

export default removeClassSlice.reducer;
