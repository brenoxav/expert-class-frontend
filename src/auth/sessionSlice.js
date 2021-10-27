/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import expertClassAPI from '../app/expertClassAPI';

const initialState = {
  user: {},
  logged_in: false,
  status: 'idle',
  error: null,
};

export const signUpUser = createAsyncThunk(
  'session/signUpUser', async (params, thunkAPI) => {
    try {
      const response = await expertClassAPI.post('/api/v1/users', { user: params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  'session/loginUser', async (username, thunkAPI) => {
    try {
      const response = await expertClassAPI.post('/api/v1/sign_in', { user: { username } });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const logoutUser = createAsyncThunk(
  'session/logoutUser', async (thunkAPI) => {
    try {
      const response = await expertClassAPI.delete('/api/v1/sign_out');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginStatus = createAsyncThunk(
  'session/loginStatus', async (thunkAPI) => {
    try {
      const response = await expertClassAPI.get('/api/v1/signed_in');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        if (action.payload.status === 'created') {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = action.payload.logged_in;
          state.error = null;
        } else {
          state.status = 'idle';
          state.user = {};
          state.logged_in = false;
          state.error = action.payload.error;
        }
      })
      .addCase(signUpUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error login in';
      })
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        if (action.payload.status === 'created') {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = action.payload.logged_in;
        } else {
          state.status = 'idle';
          state.user = {};
          state.logged_in = false;
          state.error = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error login in';
      })
      .addCase(loginStatus.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginStatus.fulfilled, (state, action) => {
        if (action.payload.logged_in) {
          state.status = 'idle';
          state.user = action.payload.user;
          state.logged_in = action.payload.logged_in;
        } else {
          state.status = 'idle';
          state.user = {};
          state.logged_in = action.payload.logged_in;
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
          state.user = {};
          state.logged_in = !action.payload.logged_out;
        }
      })
      .addCase(logoutUser.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error fetching data';
      });
  },
});

export const currentUser = (state) => state.users.user;
export const loggedInStatus = (state) => state.users.logged_in;
export const authErrors = (state) => state.users.error;

export default sessionSlice.reducer;
