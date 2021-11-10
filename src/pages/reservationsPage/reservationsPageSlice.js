/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassApi from '../../app/expertClassApi';

const initialState = {
  reservations: [],
  status: 'idle',
  error: null,
};

export const fetchReservations = createAsyncThunk(
  'reservationsSlice/getReservations', async (thunkAPI) => {
    try {
      const response = await expertClassApi.get('reservations');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const reserveCourse = createAsyncThunk(
  'reservationsSlice/createReservation', async (formData, { rejectWithValue }) => {
    try {
      const response = await expertClassApi.post('reservations', { reservation: formData });
      return response.data;
    } catch (error) {
      return rejectWithValue({ error: 'Unable to make a reservation. Please try again.' });
    }
  },
);

export const reservationsSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReservations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.reservations = action.payload;
      })
      .addCase(fetchReservations.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching reservations';
      })
      .addCase(reserveCourse.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(reserveCourse.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = 'fulfilled';
          state.reservations.push(action.payload.reservation);
        } else {
          state.status = 'fulfilled';
          state.error = action.payload.message;
        }
      })
      .addCase(reserveCourse.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error making reservation';
      });
  },
});

export const userReservations = (state) => state.reservations.reservations;
export const reservationsState = (state) => state.reservations;

export default reservationsSlice.reducer;
