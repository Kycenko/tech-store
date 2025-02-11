import React from 'react';
import { Link, useMatch } from 'react-router-dom';

const CustomLink = ({ children, to, ...props }) => {
  const match = useMatch({
    path: to,
    end: to.length == 1,
  });

  return (
    <Link
      to={to}
      {...props}
      className={
        match
          ? 'bg-gray-900 text-white text-[20px] px-4 py-2 rounded-lg mx-2'
          : 'text-gray-300 text-[20px] hover:bg-gray-700 hover:text-white px-4 py-2 rounded-lg mx-2'
      }
    >
      {children}
    </Link>
  );
};

export default CustomLink;
