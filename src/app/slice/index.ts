import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer } from 'utils/redux-injectors';
import { GlobalState } from './types';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { endpoints, formatErrors, baseQuery } from 'utils/api/endpoints';

export const initialState: GlobalState = {
  user: JSON.parse(localStorage.getItem('asp-ja-user') || 'null') || null,
  token: localStorage.getItem('asp-ja-token') || null,
  editFeed: null,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<any>) {
      localStorage.setItem('asp-ja-user', JSON.stringify(action.payload!));
      state.user = action.payload;
    },
    setToken(state, action: PayloadAction<any>) {
      localStorage.setItem('asp-ja-token', action.payload);
      state.token = action.payload;
    },
    logout(state) {
      localStorage.removeItem('asp-ja-user');
      localStorage.removeItem('asp-ja-token');
      state.user = null;
      state.token = null;
    },
    setEditFeed(state, action: PayloadAction<any>) {
      state.editFeed = action.payload?.data;
    },
  },
});

export const api = createApi({
  reducerPath: 'globalApi',
  baseQuery,
  endpoints: build => ({
    login: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.login,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    register: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.register,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    createFeed: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.createFeed.url + '/' + body.userId,
          method: endpoints.createFeed.method,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    rewriteFeedDesc: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.rewriteFeedDesc.url + '/' + body.userId,
          method: endpoints.rewriteFeedDesc.method,
          body: body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    getFeeds: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.fetchFeed,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    updateFeed: build.mutation<any, any>({
      query: body => {
        return {
          url: `${endpoints.updateFeed.url}/${body.feedId}/${body.userId}`,
          method: endpoints.updateFeed.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    deleteFeed: build.mutation<any, any>({
      query: params => {
        return {
          url: `${endpoints.deleteFeed.url}/${params.feedId}/${params.userId}`,
          method: endpoints.deleteFeed.method,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    getProfile: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.getProfile,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    updateProfile: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.updateProfile,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
  }),
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
