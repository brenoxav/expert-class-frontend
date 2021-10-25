import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  classObj: {
    id: 5,
    title: 'Setup Redux',
    description: 'Learn how to set up Redux on a React app.',
    instructor: 'Breno',
    duration: 4,
    image: '',
  },
};

export const fetchClassDetails = createAsyncThunk(
  'classes/fetchClassDetails', async (id) => {
    try {
      const data = await fetch(`localhost:3000/api/v1/courses/${id}`);
      return data.json();
    } catch (error) {
      return error.message;
    }
  },
);

export const classesSlice = createSlice({
  name: 'classDetails',
  initialState,
  reducers: {
    classDetails: (state, action) => [...state, action.payload],
  },
});

export const { classDetails } = classesSlice.actions;

export default classesSlice.reducer;
