// client/src/layout/DefaultLayout.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';

// Views
const Dashboard = React.lazy(() => import('../views/dashboard/Dashboard'));
const Profile = React.lazy(() => import('../views/pages/Profile'));

const DefaultLayout = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Dashboard />} />
      <Route exact path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default DefaultLayout;
