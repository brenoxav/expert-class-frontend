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
  reducers: {
    getClassById: (state, action) => state.classes.filter((c) => c.id === action.payload),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassesData.fulfilled, (state, action) => {
        state.classes = action.payload; // eslint-disable-line
      });
  },
});

export const { getClassById } = classesSlice.actions;
export const currentClasses = (state) => state.classes.classes;

export default classesSlice.reducer;
