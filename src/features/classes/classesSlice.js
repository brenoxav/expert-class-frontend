import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'http://localhost:3001/api/v1/courses';

export const fetchClassesData = createAsyncThunk(
  'classes/fetchClassesData',
  async () => {
    const data = await fetch(API_URL);
    return data.json();
  },
);

const initialState = {
  classes: [
    {
      id: 999,
      title: 'Setup Redux',
      description: 'Learn how to set up Redux on a React app.',
      instructor: 'Breno',
      duration: 4,
      image: '',
    },
  ],
};

export const classesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {
    getClassById: (state, action) => state.classes.filter((c) => c.id === action.payload),
  },
  extraReducers: (builder) => {
    builder.addCase(fetchClassesData.fulfilled, (state, action) => {
      state.classes = action.payload; // eslint-disable-line
    });
  },
});

export const { getClassById } = classesSlice.actions;

export default classesSlice.reducer;
