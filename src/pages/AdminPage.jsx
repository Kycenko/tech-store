import { Route, Routes, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import FormAddCategories from '../components/AdminPage/FormAddCategories/FormAddCategories';
import FormAddGoods from '../components/AdminPage/FormAddGoods/FormAddGoods';
import ListUsers from "../components/HomePage/ListUsers/ListUsers";

const AdminPage = () => {
  const location = useLocation();

  return (
    <div className='max-w-[1280px] mx-auto pb-16'>
      <h2 className='mt-4 text-[25px] sm:text-[50px] font-[700] text-center dark:text-white'>Администрирование</h2>
      <div className='flex flex-col'>
        <ListUsers/>
        <ul className='px-6 py-2 h-full flex sm:flex-row items-center flex-col justify-center'>
          <li
            className={`mb-4 sm:mb-0  ${
              location.pathname === '/admin/addGoods'
                ? 'bg-gray-900 text-white text-[20px] px-4 py-2 rounded-lg mx-2 w-fit'
                : 'bg-gray-600 text-gray-300 text-[20px] hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg mx-2 w-fit'
            }`}
          >
            <Link to='addGoods' className='text-inherit'>
              Добавить товар
            </Link>
          </li>
          <li
            className={`${
              location.pathname === '/admin/addCategories'
                ? 'bg-gray-900 text-white text-[20px] px-4 py-2 rounded-lg mx-2 w-fit'
                : 'bg-gray-600 text-gray-300 text-[20px] hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg mx-2 w-fit'
            }`}
          >
            <Link to='addCategories' className='text-inherit'>
              Добавить категорию товаров
            </Link>
          </li>
          
        </ul>
        <div className='min-h-[250px] p-6'>
          <Routes>
            <Route path='addGoods' element={<FormAddGoods />} />
            <Route path='addCategories' element={<FormAddCategories />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
