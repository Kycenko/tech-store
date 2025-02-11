import React from 'react';

const AboutUser = ({ data }) => {
  const { email, password, name, role, avatar } = data;

  return (
    <div className='flex sm:flex-row items-center sm:justify-center flex-col-reverse'>
      <div className='mr-5'>
        <h2 className='text-[16px] dark:text-white'>Почта: <span className='text-gray-400'>{email}</span></h2>
        <h2 className='text-[16px] dark:text-white'>Имя: <span className='text-gray-400'>{name}</span></h2>
        <h2 className='text-[16px] dark:text-white'>Пароль: <span className='text-gray-400'>{password}</span></h2>
        <h2 className='text-[16px] dark:text-white'>Тип: <span className='text-gray-400'>{role}</span></h2>
      </div>
        <img src={avatar} alt={name} className='w-[150px] h-[150px] object-cover  mb-4 sm:mb-0 rounded-full' />
    </div>
  
  );
};

export default AboutUser;
