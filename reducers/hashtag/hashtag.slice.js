import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const getHashtags = createAsyncThunk('thunk/getHashtags', async () => {
  const { data } = await api.hashtagAPI.getHashtags();
  return data;
});

const hashtagSlice = createSlice({
  name: 'nickname',
  initialState: {
    hashtags: [],
  },
  extraReducers: {
    [getHashtags.fulfilled]: (state, { payload }) => {
      state.hashtags = payload;
    },
  },
});

export default hashtagSlice.reducer;
