/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassApi from '../../app/expertClassApi';

const initialState = {
  status: 'idle',
  error: null,
  cities: [],
};

export const fetchCities = createAsyncThunk(
  'citiesSlice/getCities', async (thunkAPI) => {
    try {
      const response = await expertClassApi.get('cities');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: 'Unable to fetch cities. Please try again.' });
    }
  },
);

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error pulling cities. Please try again.';
      });
  },
});

export const citiesState = (state) => state.cities;

export default citiesSlice.reducer;
