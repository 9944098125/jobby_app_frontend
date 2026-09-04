import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'types';

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/api'
    : 'https://jobbyappbackend-production.up.railway.app/api';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

const prepareHeaders = (headers: any, { getState }) => {
  const token = (getState() as RootState)?.global?.token;
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  return headers;
};
export const baseQuery = fetchBaseQuery({
  baseUrl,
  headers: defaultHeaders,
  prepareHeaders,
});

export const formatErrors = (errors: any) => {
  return errors?.message || 'Something went wrong';
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

export const endpoints = {
  baseUrl,
  login: {
    url: '/auth/login',
    method: HTTP_METHODS.POST,
  },
  register: {
    url: '/auth/register',
    method: HTTP_METHODS.POST,
  },
  fetchFeed: {
    url: '/feed/read',
    method: HTTP_METHODS.GET,
  },
  createFeed: {
    url: '/feed/create',
    method: HTTP_METHODS.POST,
  },
  rewriteFeedDesc: {
    url: '/feed/ai-rewrite',
    method: HTTP_METHODS.POST,
  },
  updateFeed: {
    url: '/feed/update',
    method: HTTP_METHODS.PATCH,
  },
  deleteFeed: {
    url: '/feed/delete',
    method: HTTP_METHODS.DELETE,
  },
  getProfile: {
    url: '/auth/getProfile',
    method: HTTP_METHODS.GET,
  },
  updateProfile: {
    url: '/auth/update',
    method: HTTP_METHODS.PATCH,
  },
  updatePassword: {
    url: '/auth/updatePassword',
    method: HTTP_METHODS.PATCH,
  },
  createJob: {
    url: '/jobs/createJob',
    method: HTTP_METHODS.POST,
  },
  readJobs: {
    url: '/jobs/getJobs',
    method: HTTP_METHODS.GET,
  },
  updateJob: {
    url: '/jobs/update',
    method: HTTP_METHODS.PATCH,
  },
  deleteJob: {
    url: '/jobs/delete',
    method: HTTP_METHODS.DELETE,
  },
  generateAboutTheJob: {
    url: '/jobs/generate-job-description',
    method: HTTP_METHODS.POST,
  },
  uploadResume: {
    url: '/auth/upload-resume',
    method: HTTP_METHODS.POST,
  },
  applyForJob: {
    url: '/auth/apply',
    method: HTTP_METHODS.PATCH,
  },
  jobsAppliedByUser: {
    url: '/auth/jobsAppliedByUser',
    method: HTTP_METHODS.GET,
  },
  getApplicants: {
    url: '/jobs/applicants',
    method: HTTP_METHODS.GET,
  },
};
