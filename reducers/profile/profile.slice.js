import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { follow, unfollow } from '../thunk';
export const getProfile = createAsyncThunk(
  'thunk/getProfile',
  async (obj, thunkAPI) => {
    try {
      const { data } = await api.userAPI.getProfile(obj);
      return data;
    } catch (error) {
      if (error.response) return thunkAPI.rejectWithValue(error.response?.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const getFollowings = createAsyncThunk(
  'thunk/getFollowings',
  async (obj, thunkAPI) => {
    try {
      const { data } = await api.userAPI.getFollowings(obj);
      return data;
    } catch (error) {
      if (error.response) return thunkAPI.rejectWithValue(error.response?.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
export const getFollowers = createAsyncThunk(
  'thunk/getFollowers',
  async (obj, thunkAPI) => {
    try {
      const { data } = await api.userAPI.getFollowers(obj);
      return data;
    } catch (error) {
      if (error.response) return thunkAPI.rejectWithValue(error.response?.data);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    user: null,
    follower: 0,
    following: 0,
    followers: [],
    followings: [],
  },
  reducers: {
    addFollowing: (state) => {
      state.following += 1;
    },
    delFollowing: (state) => {
      state.following -= 1;
    },
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.user = action.payload.User || null;
      state.follower = action.payload.follower || 0;
      state.following = action.payload.following || 0;
    },
    [getFollowers.fulfilled]: (state, action) => {
      state.followers = action.payload;
    },
    [getFollowings.fulfilled]: (state, action) => {
      state.followings = action.payload;
    },
    [unfollow.fulfilled]: (state, { payload }) => {
      if (payload.UserId === state.user?.id) state.follower -= 1;
    },
    [follow.fulfilled]: (state, { payload }) => {
      if (payload.UserId === state.user?.id) state.follower += 1;
    },
  },
});

export const { addFollowing, delFollowing } = profileSlice.actions;
export default profileSlice.reducer;
