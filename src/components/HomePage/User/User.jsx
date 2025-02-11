

const User = ({ name, password, role}) => {
  return (
    <div className='flex flex-col mb-4 border-b-2 last:border-b-0'>
      <h1 className='dark:text-black'>{'Логин'} <span className='text-gray-400 text-[18px]'>{name}</span></h1>
      <h1 className='dark:text-black'>{'Пароль'}: <span className='text-gray-400 text-[18px]'>{password}</span></h1>
      <h1 className='dark:text-black'>{'Роль пользователя'}: <span className='text-gray-400  text-[18px]'>{role}</span></h1>
    </div>
  );
};

export default User;
