// client/src/App.js
import React, { Suspense, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CSpinner, useColorModes } from '@coreui/react';
import PropTypes from 'prop-types';
import './scss/style.scss';
import axios from 'axios';

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/Login'));
const Register = React.lazy(() => import('./views/pages/Register'));
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const PrivateRoute = ({ element }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);
  
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );
  
  return token ? element : null;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme');
  const storedTheme = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0];
    if (theme) {
      setColorMode(theme);
    }

    if (isColorModeSet()) {
      return;
    }

    setColorMode(storedTheme);
  }, [isColorModeSet, setColorMode, storedTheme]);

  return (
    <>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} /> */}
          {/* <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          {/* <Route path="/profile" element={<PrivateRoute element={<DefaultLayout />} />} /> */}
          <Route path="*" name="inicio" element={<PrivateRoute element={<DefaultLayout />} />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
