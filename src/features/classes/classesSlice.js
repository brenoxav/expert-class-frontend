/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import expertClassApi from '../../app/expertClassApi';

const initialState = {
  classes: [],
  status: 'idle',
  error: null,
};

export const fetchClassesData = createAsyncThunk(
  'classes/fetchClassesData', async (thunkAPI) => {
    try {
      const response = await expertClassApi.get('courses');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchClassesData.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.classes = action.payload;
      })
      .addCase(fetchClassesData.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data.';
      });
  },
});

export const currentClasses = (state) => state.classes.classes;
export const classesStateStatus = (state) => state.classes.status;

export default classesSlice.reducer;
