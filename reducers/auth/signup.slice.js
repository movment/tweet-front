import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const signup = createAsyncThunk(
  'thunk/signup',
  async (obj, thunkAPI) => {
    try {
      const { data } = await api.authAPI.signup(obj);
      return data;
    } catch (error) {
      if (error.response) {
        return thunkAPI.rejectWithValue(error.response.data);
      }
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const signupSlice = createSlice({
  name: 'signup',
  initialState: {
    loading: false,
    done: false,
    error: null,
  },
  extraReducers: {
    [signup.pending]: (state) => {
      state.loading = true;
      state.done = false;
      state.error = null;
    },
    [signup.fulfilled]: (state) => {
      state.done = true;
      state.loading = false;
    },
    [signup.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default signupSlice.reducer;
