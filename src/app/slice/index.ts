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
  editJob: null,
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
    setEditJob(state, action: PayloadAction<any>) {
      state.editJob = action.payload?.data;
    },
    updateUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
      localStorage.setItem('asp-ja-user', JSON.stringify(action.payload!));
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
          url: endpoints.updateProfile.url + '/' + body.userId,
          method: endpoints.updateProfile.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    updatePassword: build.mutation<any, any>({
      query: body => {
        return {
          url: endpoints.updatePassword.url + '/' + body.userId,
          method: endpoints.updatePassword.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    createJob: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.createJob,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    updateJob: build.mutation<any, any>({
      query: body => {
        return {
          url: `${endpoints.updateJob.url}/${body.jobId}`,
          method: endpoints.updateJob.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    getJobs: build.query<any, any>({
      query: params => {
        return {
          ...endpoints.readJobs,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    deleteJob: build.mutation<any, any>({
      query: params => {
        return {
          url: `${endpoints.deleteJob.url}/${params.jobId}`,
          method: endpoints.deleteJob.method,
          params,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    generateAboutTheJob: build.mutation<any, any>({
      query: body => {
        return {
          ...endpoints.generateAboutTheJob,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    uploadResume: build.mutation<any, any>({
      query: ({ userId, body }) => {
        return {
          url: endpoints.uploadResume.url + '/' + userId,
          method: endpoints.uploadResume.method,
          body,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    applyForJob: build.mutation<any, any>({
      query: ({ jobId, userId }) => {
        return {
          url: endpoints.applyForJob.url + '/' + jobId + '/' + userId,
          method: endpoints.applyForJob.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    jobsAppliedByUser: build.query<any, any>({
      query: ({ userId }) => {
        return {
          url: endpoints.jobsAppliedByUser.url + '/' + userId,
          method: endpoints.jobsAppliedByUser.method,
        };
      },
      transformErrorResponse(baseQueryReturnValue, meta, arg) {
        return formatErrors(baseQueryReturnValue.data);
      },
    }),
    getJobApplicants: build.query<any, any>({
      query: ({ employerId }) => {
        return {
          url: endpoints.getApplicants.url + '/' + employerId,
          method: endpoints.getApplicants.method,
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
