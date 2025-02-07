import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

const selectSlice = (state: RootState) => state.global || initialState;

export const selectGlobal = createSelector([selectSlice], state => state);
export const selectUser = createSelector([selectSlice], state => state.user);
export const selectFeedEdit = createSelector(
  [selectSlice],
  state => state.editFeed,
);
export const selectEditJob = createSelector(
  [selectSlice],
  state => state.editJob,
);
