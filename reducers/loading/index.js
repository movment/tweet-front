import { createReducer } from '@reduxjs/toolkit';

const initialState = {};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action) => /\/(pending|rejected|fulfilled)$/.test(action.type),
      (_, action) => {
        action.newType = action.type.replace(/\/\w+$/, '');
      },
    )
    .addMatcher(
      (action) => action.type.endsWith('/pending'),
      (state, { newType }) => {
        if (state[newType]) {
          state[newType].loading = true;
          state[newType].error = null;
        } else {
          state[newType] = { loading: true, error: null };
        }
      },
    )
    .addMatcher(
      (action) => action.type.endsWith('/rejected'),
      (state, action) => {
        const newType = action.newType;
        if (state[newType]) {
          state[newType].loading = false;
          state[newType].error = action.error.message;
        }
      },
    )
    .addMatcher(
      (action) => action.type.endsWith('/fulfilled'),
      (state, { newType }) => {
        state[newType].loading = false;
      },
    );
});

export default reducer;
