import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { follow, unfollow, logout } from '../thunk';
import { getFollowers, getFollowings } from '../profile/profile.slice';
export const getPosts = createAsyncThunk(
  'thunk/getPosts',
  async (obj) => {
    const { data } = await api.postAPI.getPosts(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading, post } = getState();
      if (loading['thunk/getPosts']?.loading) {
        return false;
      }
    },
  },
);
export const getMorePosts = createAsyncThunk(
  'thunk/getMorePosts',
  async (obj) => {
    const { data } = await api.postAPI.getPosts(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading, post } = getState();
      if (loading['thunk/getMorePosts']?.loading) {
        return false;
      }
    },
  },
);

export const getPost = createAsyncThunk('thunk/getPost', async (obj) => {
  const { data } = await api.postAPI.getPost(obj);
  return data;
});
export const addPost = createAsyncThunk('thunk/addPost', async (obj) => {
  const { data } = await api.postAPI.addPost(obj);
  return data;
});
export const uploadImages = createAsyncThunk(
  'thunk/uploadImages',
  async (FormData) => {
    const { data } = await api.postAPI.uploadImages(FormData);
    return data;
  },
);
export const likePost = createAsyncThunk('thunk/likePost', async (obj) => {
  const { data } = await api.postAPI.likePost(obj);
  return data;
});
export const unlikePost = createAsyncThunk('thunk/unlikePost', async (obj) => {
  const { data } = await api.postAPI.unlikePost(obj);
  return data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    more: true,
    user: null,
    posts: [],
    users: {},
    imagePaths: [],
  },
  reducers: {
    removeImage: (state) => {
      state.imagePaths = new Array();
    },
  },
  extraReducers: {
    [getPosts.fulfilled]: (state, { payload }) => {
      state.posts = payload.Posts;
      state.more = true;
      if (payload.Posts.length < 10) state.more = false;
      // 수정
      state.users = state.posts.reduce((acc, cur) => {
        if (!acc[cur.UserId]) {
          acc[cur.UserId] = cur.User;
          if (cur.User.Followers?.length) {
            acc[cur.UserId].isFollowing = true;
          }
        }
        return acc;
      }, {});
    },
    [getMorePosts.fulfilled]: (state, { payload }) => {
      const length = payload.Posts?.length;
      if (
        state.posts[state.posts.length - 1]?.id ===
        payload.Posts[length - 1]?.id
      ) {
        console.log('확인');
        return;
      }
      state.posts = [...state.posts, ...payload.Posts];

      if (payload.Posts.length < 10) state.more = false;
      // 수정
      state.users = state.posts.reduce((acc, cur) => {
        if (!acc[cur.UserId]) acc[cur.UserId] = cur.User;
        return acc;
      }, {});
    },
    [addPost.fulfilled]: (state, { payload }) => {
      state.imagePaths = [];
      state.posts.unshift(payload.post);
    },
    [uploadImages.fulfilled]: (state, { payload }) => {
      state.imagePaths = payload.imagePaths;
    },
    [follow.fulfilled]: (state, { payload }) => {
      state.users[payload.UserId].isFollowing = true;
    },
    [unfollow.fulfilled]: (state, { payload }) => {
      state.users[payload.UserId].isFollowing = false;
    },
    [getPost.fulfilled]: (state, { payload }) => {
      state.posts = [payload];
      state.users = state.posts.reduce((acc, cur) => {
        if (!acc[cur.UserId]) acc[cur.UserId] = cur.User;
        if (cur.User.Followers?.length) {
          acc[cur.UserId].isFollowing = true;
        }
        return acc;
      }, {});
    },
    [likePost.fulfilled]: (state, { payload }) => {
      for (let post of state.posts) {
        if (post.id === payload.PostId) {
          post.Likers[0] = true;
          break;
        }
      }
    },
    [unlikePost.fulfilled]: (state, { payload }) => {
      for (let post of state.posts) {
        if (post.id === payload.PostId) {
          post.Likers = [];
          break;
        }
      }
    },
    [logout.fulfilled]: (state) => {
      state.users = {};
      state.posts.forEach((post) => {
        post.Likers = [];
      });
    },
    [getFollowers.fulfilled]: (state, action) => {
      action.payload.forEach((user) => {
        if (state.users[user.id]) {
          state.users[user.id].isFollowing = user.isFollowing || false;
        } else {
          state.users[user.id] = {
            user,
            isFollowing: user.isFollowing || false,
          };
        }
      });
    },
    [getFollowings.fulfilled]: (state, action) => {
      action.payload.forEach((user) => {
        if (state.users[user.id]) {
          state.users[user.id].isFollowing = user.isFollowing || false;
        } else {
          state.users[user.id] = {
            user,
            isFollowing: user.isFollowing || false,
          };
        }
      });
    },
  },
});

export const { removeImage } = postSlice.actions;
export default postSlice.reducer;
