import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  class: [
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
  name: 'classDetails',
  initialState,
  reducers: {
    classDetails: (state, action) => [...state, action.payload],
  },
});

export const { classDetails } = classesSlice.actions;

export default classesSlice.reducer;
