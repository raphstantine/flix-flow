import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { RouterProvider } from 'react-router-dom';
import { Display } from './pages/display';
import { AboutUs } from './pages/about';
import { Sinopsis } from './pages/sinopsis';
import { Helmet } from 'react-helmet';

const root = ReactDOM.createRoot(document.getElementById('root'));
const router = createBrowserRouter([
  {
    path: '/',
    element: <>
      <Home/>
      <link rel="stylesheet" href="/home.css"/>
    </>
  },
  {
    path: "/display",
    element: <>
      <Display/>
        <link rel="stylesheet" href="/display.css"/>
    </>
  },
  {
    path: "/aboutus",
    element: <>
    <link rel="stylesheet" href="/about.css"/>
    <AboutUs />
    </>
  },
  {
    path: "/sinopsis",
    element: <>
    <Sinopsis/>
    <link rel="stylesheet" href="/sinopsis.css"/>
      </>
  }
])

root.render(
    <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
