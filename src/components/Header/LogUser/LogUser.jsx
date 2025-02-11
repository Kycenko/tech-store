import React from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../../redux/features/initialUsers/initialUsersSlice';
import { ImExit, ImEnter } from 'react-icons/im';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from "react-icons/hi";

const LogUser = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.users.auth);
  const authCustomer = useSelector((state) => state.users.authCustomer);
  const user = useSelector((state) => state.users.lkUser);
  
  const successMessageAdmin = () => {
    message.success('Вы вышли из профиля', [1]);
  };
  
  const handleClick = () => {
    successMessageAdmin();
    dispatch(logOut());
  };
  
  return (
    <div className='flex items-center '>
      {auth === false && authCustomer === false ? (
        <Link to='/lk'>
          <ImEnter className='ml-6 text-white w-[25px] h-[25px] cursor-pointer' />
        </Link>
      ) : null}
      {auth || authCustomer ? (
        <>
          {authCustomer && (
            <>
              <Link to='/basket'>
                <HiOutlineShoppingCart className='mr-6 w-[25px] h-[25px] text-gray-300 hover:text-white duration-300' />
              </Link>
            </>
          )}
          <Link to='/lk/about'>
            <img
              src={user.avatar}
              alt='avatar'
              className='w-[50px] h-[50px] object-cover rounded-full'
            />
          </Link>
          <ImExit
            onClick={handleClick}
            className='ml-6 w-[25px] h-[25px] cursor-pointer text-gray-300 hover:text-white duration-300'
          />
        </>
      ) : null}
    </div>
  );
};

export default LogUser;
