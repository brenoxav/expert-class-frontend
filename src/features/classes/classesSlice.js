/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3001/api/v1/courses';

const initialState = {
  classes: [],
  status: 'idle',
  error: null,
};

export const fetchClassesData = createAsyncThunk(
  'classes/fetchClassesData',
  async () => {
    const data = await fetch(API_URL);
    return data.json();
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
