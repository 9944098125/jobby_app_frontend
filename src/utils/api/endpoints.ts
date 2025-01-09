import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'types';

const baseUrl = 'https://jobbyappbackend-production.up.railway.app/api';

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
  return errors?.response || 'Something went wrong';
};

export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const endpoints = {
  baseUrl,
  login: {
    url: '/auth/login',
    method: HTTP_METHODS.POST,
  },
};
