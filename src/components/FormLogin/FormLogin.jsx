import React from 'react';
import { Link } from 'react-router-dom';
import AddButton from '../../ui/Button/AddButton/AddButton';
import InputText from '../../ui/Input/InputText';

const FormLogin = ({ onSubmit }) => {
  
  return (
    <div className='flex justify-center flex-col items-center my-10 px-4'>
      <h1 className='text-[20px]'>Авторизация</h1>
      <form
        onSubmit={onSubmit}
        className=' px-8 py-6 flex flex-col border-2 max-w-[500px]'
      >
        <InputText
          labelName={'Логин'}
          name={'userName'}
          placeholder={'Введите логин'}
        />
        <InputText
          type='password'
          labelName={'Пароль'}
          name={'userPassword'}
          placeholder={'Введите пароль'}
        />
        <AddButton type={'submit'} text={'Войти'} />
      </form>
      <p className='mt-4'>Если Вы еще не зарегистрированны - <Link className='text-blue-600' to='/registration'>Зарегистрируйтесь</Link></p>
    </div>
  );
};

export default FormLogin;
