import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const PrivatAdmin = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.users.auth);

  if (auth === false ) {
    return <Navigate to='/' state={{ from: location }} />;
  }

  return children;
};

export default PrivatAdmin;
