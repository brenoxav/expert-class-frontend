/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassAPI from '../../app/expertClassAPI';

const initialState = {
  status: 'idle',
  error: null,
};

export const reserveCourse = createAsyncThunk(
  'reservePageSlice/reservations', async (formData, thunkAPI) => {
    try {
      const response = await expertClassAPI.post('/api/v1/reservations', { reservation: formData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const reservePageSlice = createSlice({
  name: 'reservePage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reserveCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reserveCourse.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'idle';
        } else {
          state.status = 'idle';
          state.error = action.payload.message;
        }
      })
      .addCase(reserveCourse.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error making reservation';
      });
  },
});

export default reservePageSlice.reducer;
