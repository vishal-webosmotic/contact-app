import { useEffect } from 'react';

import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { RouterProvider } from 'react-router-dom';

import { contactRoutes, routes } from './routes';
import { fetchContent } from './store/userSlice';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {
  const { user, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent());
  }, [dispatch]);
  return loading ? (
    <Spinner animation="border" />
  ) : (
    <RouterProvider router={user ? contactRoutes : routes}></RouterProvider>
  );
}

export default App;
