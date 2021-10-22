/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getCSRFToken from '../../app/getCSRFToken';
// import expertClassAPI from '../../expertClassAPI';

const initialState = {
  user: {
    username: '',
    name: 'no one here',
  },
  logged_in: false,
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk(
  'signInSlice/loginUser', async (username, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:3001/api/v1/sign_in', { user: { username } },
        {
          withCredentials: true,
          headers: {
            'X-CSRF-Token': getCSRFToken()
            // 'Content-Type': 'application/json'
          }
        });
      console.log('login response: ', response)
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginStatus = createAsyncThunk(
  'signInSlice/loginStatus', async (thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:3001/api/v1/signed_in', { withCredentials: true });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const signInSlice = createSlice({
  name: 'signIn',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log('payload: ', action.payload);
        if (action.payload.status === 'created') {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = true;
        } else {
          state.status = 'idle';
          state.error = action.payload.status;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      })
      .addCase(loginStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginStatus.fulfilled, (state, action) => {
        console.log('loginStatus payload: ', action.payload);
        if (action.payload.logged_in) {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = true;
        } else {
          state.status = 'idle';
          state.logged_in = false;
          state.user = 'nobody';
        }
      })
      .addCase(loginStatus.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      });
  },
});

// export const { addReservation } = reservationsSlice.actions;

// export const currentUser = (state) => state.users.user;

export default signInSlice.reducer;
