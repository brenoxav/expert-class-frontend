import { createSlice } from '@reduxjs/toolkit';

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
    addClass: (state, action) => [...state, action.payload],
  },
});

export const { addClass } = classesSlice.actions;

export default classesSlice.reducer;
