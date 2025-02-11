import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router';

const Privat = ({ children }) => {
  const location = useLocation();
  const auth = useSelector((state) => state.users.auth);
  const authCustomer = useSelector((state) => state.users.authCustomer);

  if (auth === false && authCustomer === false) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
 
  return children;
};

export default Privat;
