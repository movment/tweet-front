import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../../lib/api';
import { follow, unfollow, logout } from '../thunk';
import { getFollowers, getFollowings } from '../profile/profile.slice';

export const deletePost = createAsyncThunk(
  'thunk/deletePost',
  async (obj) => {
    const { data } = await api.postAPI.deletePost(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/deletePost']?.loading) {
        return false;
      }
    },
  },
);
export const getPosts = createAsyncThunk('thunk/getPosts', async (obj) => {
  const { data } = await api.postAPI.getPosts(obj);
  return data;
});
export const getMorePosts = createAsyncThunk(
  'thunk/getMorePosts',
  async (obj) => {
    const { data } = await api.postAPI.getPosts(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
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
export const addPost = createAsyncThunk(
  'thunk/addPost',
  async (obj) => {
    const { data } = await api.postAPI.addPost(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/addPost']?.loading) {
        return false;
      }
    },
  },
);
export const uploadImages = createAsyncThunk(
  'thunk/uploadImages',
  async (FormData) => {
    const { data } = await api.postAPI.uploadImages(FormData);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/uploadImages']?.loading) {
        return false;
      }
    },
  },
);
export const likePost = createAsyncThunk(
  'thunk/likePost',
  async (obj) => {
    const { data } = await api.postAPI.likePost(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/likePost']?.loading) {
        return false;
      }
    },
  },
);
export const unlikePost = createAsyncThunk(
  'thunk/unlikePost',
  async (obj) => {
    const { data } = await api.postAPI.unlikePost(obj);
    return data;
  },
  {
    condition: (_, { getState }) => {
      const { loading } = getState();
      if (loading['thunk/unlikePost']?.loading) {
        return false;
      }
    },
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState: {
    more: true,
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
        }
        if (cur.User.Followers?.length) {
          acc[cur.UserId].isFollowing = true;
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
        return;
      }

      state.posts = [...state.posts, ...payload.Posts];

      if (payload.Posts.length < 10) state.more = false;
      // 수정
      state.users = state.posts.reduce((acc, cur) => {
        if (!acc[cur.UserId]) {
          acc[cur.UserId] = cur.User;
        }
        if (cur.User.Followers?.length) {
          acc[cur.UserId].isFollowing = true;
        }
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
      if (state.users[payload.UserId])
        state.users[payload.UserId].isFollowing = true;
    },
    [unfollow.fulfilled]: (state, { payload }) => {
      if (state.users[payload.UserId])
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
    [deletePost.fulfilled]: (state, { payload }) => {
      state.posts = state.posts.filter((post) => {
        if (post.id === payload.PostId) {
          return false;
        }
        return true;
      });
    },
  },
});

export const { removeImage } = postSlice.actions;
export default postSlice.reducer;
