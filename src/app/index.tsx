/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import { GlobalStyle } from 'styles/global-styles';

import { NotFound } from './pages/NotFound/Loadable';
import { useTranslation } from 'react-i18next';
import { useGlobalSlice } from './slice';
import { Login } from './pages/Login/Loadable';
import { Feed } from './pages/Feed/Loadable';
import Layout from './components/layout';
import { Register } from './pages/Register/Loadable';

export function App() {
  const { i18n } = useTranslation();
  useGlobalSlice();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Jobby App"
        defaultTitle="Jobby App"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Jobby App" />
      </Helmet>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Feed />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <GlobalStyle /> */}
    </BrowserRouter>
  );
}
