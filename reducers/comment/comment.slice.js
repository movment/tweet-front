import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';

export const getComments = createAsyncThunk(
  'thunk/getComments',
  async (obj) => {
    const { data } = await api.commentAPI.getComments(obj);
    return data;
  },
);
export const addComment = createAsyncThunk(
  'thunk/addComment',
  async (obj) => {
    const { data } = await api.commentAPI.addComment(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/addComment']?.loading) {
        console.log(1);
        return false;
      }
    },
  },
);

const commentSlice = createSlice({
  name: 'comment',
  initialState: {
    comments: [],
    total: 0,
  },
  extraReducers: {
    [getComments.fulfilled]: (state, { payload }) => {
      state.comments = payload.comments;
      state.total = payload.total;
    },
    [getComments.rejected]: (state) => {
      state.comments = [];
      state.total = 0;
    },
    [addComment.fulfilled]: (state, { payload }) => {
      state.comments.push(payload);
    },
  },
});

export default commentSlice.reducer;
