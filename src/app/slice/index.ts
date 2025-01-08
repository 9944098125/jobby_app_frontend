import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GlobalState } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';

export const initialState: GlobalState = {
  user: JSON.parse(localStorage.getItem('user') || 'null') || null,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      localStorage.setItem('user', JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const api = createApi({
  reducerPath: 'global',
  baseQuery,
  endpoints: build => ({}),
});

export const { actions: globalActions } = slice;

export const useGlobalSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectReducer({ key: api.reducerPath, reducer: api.reducer });
  return {
    actions: slice.actions,
    ...api,
  };
};
