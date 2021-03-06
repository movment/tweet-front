import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import profile from './profile/profile.slice';
import comment from './comment/comment.slice';
import auth from './auth/auth.slice';
import post from './post/post.slice';
import loading from './loading';
import hashtag from './hashtag/hashtag.slice';

const reducer = (state = {}, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return combineReducers({
    loading,
    profile,
    auth,
    comment,
    hashtag,
    post,
  })(state, action);
};

const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'production' ? false : true,
});

export const wrapper = createWrapper((context) => store, { debug: false });
