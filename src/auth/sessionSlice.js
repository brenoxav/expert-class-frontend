/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
// import getCSRFToken from '../app/getCSRFToken';

const initialState = {
  user: {},
  logged_in: false,
  status: 'idle',
  error: null,
  csrf: null,
};

export const getCSRFToken = createAsyncThunk(
  'session/token', async (thunkAPI) => {
    try {
      // const response = await axios.post('https://expert-class-backend.herokuapp.com/api/v1/token', { user: params },
      //   {
      //     withCredentials: true,
      //     // headers: {
      //     //   'X-CSRF-Token': getCSRFToken(),
      //     // },
      //   });
      // return response.data;
      const response = await (await fetch('https://expert-class-backend.herokuapp.com/api/v1/token', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          accept: 'application/json, text/plain, */*', 'content-type': 'application/json',
        },
      })).json();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const signUpUser = createAsyncThunk(
  'session/signUpUser', async (params, thunkAPI) => {
    try {
      const response = await axios.post('https://expert-class-backend.herokuapp.com/api/v1/users', { user: params },
        {
          withCredentials: true,
          // headers: {
          //   'X-CSRF-Token': getCSRFToken(),
          // },
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginUser = createAsyncThunk(
  'session/loginUser', async (username, thunkAPI) => {
    try {
      // const response = await axios.post('https://expert-class-backend.herokuapp.com/api/v1/sign_in', { user: { username } },
      //   {
      //     withCredentials: true,
      //     // headers: {
      //     //   'X-CSRF-Token': getCSRFToken(),
      //     // },
      //   });
      // return response.data;
      const response = await (await fetch('https://expert-class-backend.herokuapp.com/api/v1/sign_in', {
        method: 'POST',
        body: JSON.stringify({ user: { username } }),
        credentials: 'include',
        mode: 'cors',
        headers: {
          accept: 'application/json, text/plain, */*', 'content-type': 'application/json',
        },
      })).json();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const logoutUser = createAsyncThunk(
  'session/logoutUser', async (thunkAPI) => {
    try {
      const response = await axios.delete('https://expert-class-backend.herokuapp.com/api/v1/sign_out',
        {
          withCredentials: true,
          // headers: {
          //   'X-CSRF-Token': getCSRFToken(),
          // },
        });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message });
    }
  },
);

export const loginStatus = createAsyncThunk(
  'session/loginStatus', async (thunkAPI) => {
    try {
      // const response = await axios.get('https://expert-class-backend.herokuapp.com/api/v1/signed_in', { withCredentials: true });
      // return response.data;
      const response = await (await fetch('https://expert-class-backend.herokuapp.com/api/v1/signed_in', {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
        headers: {
          accept: 'application/json, text/plain, */*', 'content-type': 'application/json',
        },
      })).json();
      return response;
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
      .addCase(getCSRFToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCSRFToken.fulfilled, (state, action) => {
        if (action.payload.status === 'created') {
          state.status = 'idle';
          state.csrf = unescape(document.cookie.split('=')[1]);
          state.error = null;
        } else {
          state.status = 'idle';
          state.user = {};
          state.logged_in = false;
          state.error = 'Error reaching out server. Please try again';
        }
      })
      .addCase(getCSRFToken.rejected, (state) => {
        state.status = 'rejected';
        state.error = 'Error connecting to server. Please try again';
      })
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
          state.error = 'Username does not exist. Please try again.';
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
export const isToken = (state) => state.users.csrf;

export default sessionSlice.reducer;
