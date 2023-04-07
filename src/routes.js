import React from 'react';

import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './components/ErrorPage';
import ContactForm from './pages/contact-form/ContactForm';
import ContactList from './pages/ContactList';
import SignIn from './pages/sign-in/SignIn';
import SignUp from './pages/sign-up/SignUp';

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/signup',
    element: <SignUp />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export const contactRoutes = createBrowserRouter([
  {
    path: '/',
    element: <ContactList />,
  },
  {
    path: '/contact',
    element: <ContactForm />,
  },
  {
    path: '/contact/:id',
    element: <ContactForm />,
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
