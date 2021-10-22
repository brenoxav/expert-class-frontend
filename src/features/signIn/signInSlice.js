/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassAPI from '../../app/expertClassAPI';

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
      const response = await expertClassAPI.post('/api/v1/sign_in', { user: { username } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const logoutUser = createAsyncThunk(
  'signInSlice/logoutUser', async (thunkAPI) => {
    try {
      const response = await expertClassAPI.delete('/api/v1/sign_out');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginStatus = createAsyncThunk(
  'signInSlice/loginStatus', async (thunkAPI) => {
    try {
      const response = await expertClassAPI.get('/api/v1/signed_in');
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
        if (action.payload.logged_in) {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = true;
        } else {
          state.status = 'idle';
          state.logged_in = false;
          state.user = {
            username: '',
            name: 'nobody',
          };
        }
      })
      .addCase(loginStatus.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      })
      .addCase(logoutUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        if (action.payload.logged_out) {
          state.status = 'idle';
          state.user = {
            username: '',
            name: 'you are logged out',
          };
          state.logged_in = false;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      });
  },
});

// export const { addReservation } = reservationsSlice.actions;

// export const currentUser = (state) => state.users.user;

export default signInSlice.reducer;
