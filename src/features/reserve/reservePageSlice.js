/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getCSRFToken from '../../app/getCSRFToken';

const initialState = {
  status: 'idle',
  error: null,
  cities: [],
};

export const reserveCourse = createAsyncThunk(
  'reservePageSlice/reservations', async (formData, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/reservations', { reservation: formData },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-Token': getCSRFToken(),
          },
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'Unable to make a reservation. Please try again.' });
    }
  },
);

export const fetchCities = createAsyncThunk(
  'reservePageSlice/cities', async (thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/cities', { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'Unable to fetch cities. Please try again.' });
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
      })
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error pulling cities. Please try again.';
      });
  },
});

export const currentCities = (state) => state.reserve.cities;

export default reservePageSlice.reducer;
