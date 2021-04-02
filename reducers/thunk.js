import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../lib/api';
import { addFollowing, delFollowing } from './profile/profile.slice';

export const follow = createAsyncThunk(
  'thunk/follow',
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.userAPI.follow(userData);

      const { auth, profile } = thunkAPI.getState();
      if (auth.user?.id === profile.user?.id) thunkAPI.dispatch(addFollowing());

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
export const unfollow = createAsyncThunk(
  'thunk/unfollow',
  async (userData, thunkAPI) => {
    try {
      const { data } = await api.userAPI.unfollow(userData);

      const { auth, profile } = thunkAPI.getState();
      if (auth.user?.id === profile.user?.id) thunkAPI.dispatch(delFollowing());

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
export const logout = createAsyncThunk('thunk/logout', async (_, thunkAPI) => {
  try {
    const { data } = await api.authAPI.logout();
    return data;
  } catch (error) {
    // 수정
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});
