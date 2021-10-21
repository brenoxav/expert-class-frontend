/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassAPI from '../../expertClassAPI';

const initialState = {
  user: {},
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'signInSlice/loginUser',
  async () => {
    const response = await expertClassAPI.get('/api/v1/sign_in');
    return response.data;
  },
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.message = action.payload.message;
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      });
  },
});

// export const { addReservation } = reservationsSlice.actions;

export const currentUser = (state) => state.signIn.user;

export default signInSlice.reducer;
