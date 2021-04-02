import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as commentAPI from '../../lib/api/comment';

export const editNickname = createAsyncThunk(
  'nickname/editnickname',
  async (nicknameData) => {
    const { data } = await commentAPI.addComment(nicknameData);
    return data;
  },
);

const nicknameSlice = createSlice({
  name: 'nickname',
  initialState: {
    loading: false,
    done: false,
    error: null,
  },
  extraReducers: {
    [editNickname.pending]: (state) => {
      state.loading = true;
      state.done = false;
      state.error = null;
    },
    [editNickname.fulfilled]: (state) => {
      state.loading = false;
      state.done = true;
    },
    [editNickname.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export default nicknameSlice.reducer;
