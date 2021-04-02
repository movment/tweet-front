import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { logout } from '../thunk';
export const login = createAsyncThunk('thunk/login', async (obj, thunkAPI) => {
  try {
    const { data } = await api.authAPI.login(obj);
    return data;
  } catch (error) {
    // 수정
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});
// export const logout = createAsyncThunk('thunk/logout', async (_, thunkAPI) => {
//   try {
//     const { data } = await api.authAPI.logout();
//     return data;
//   } catch (error) {
//     // 수정
//     return thunkAPI.rejectWithValue(error.response?.data);
//   }
// });
export const checkAuth = createAsyncThunk(
  'thunk/checkAuth',
  async (_, thunkAPI) => {
    try {
      const { data } = await api.authAPI.check();
      return data;
    } catch (error) {
      // 수정
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
  },
  reducers: {
    check: (state, action) => {
      if (action.payload) {
        state.isLoggedIn = true;
        state.user = action.payload;
      } else {
        state.isLoggedIn = false;
        state.user = null;
      }
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = payload.User;
    },
    [checkAuth.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload.User;
    },
    [checkAuth.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.rejected]: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { check } = authSlice.actions;
export default authSlice.reducer;
