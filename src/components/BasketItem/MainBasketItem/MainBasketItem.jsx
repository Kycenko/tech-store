import React from 'react';
import { Link } from 'react-router-dom';

const MainBasketItem = ({ id, title, price, img }) => {
  return (
    <Link
      to={`/goods/${id}`}
      state={{
        adres: '/basket',
      }}
    >
      <div className='flex items-center '>
        <img
          src={img}
          alt={title}
          className='h-[100px] w-[100px] object-cover mr-10'
        />
        <div>
          <h2 className='dark:text-black'>{title}</h2>
          <h2 className='dark:text-black'>{price} BR</h2>
        </div>
      </div>
    </Link>
  );
};

export default MainBasketItem;
