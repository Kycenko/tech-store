import React from 'react';
import DecrementGoodsBtn from '../../ui/Button/DecrementGoodsBtn/DecrementGoodsBtn';
import IncrementGoodsBtn from '../../ui/Button/IncrementGoodsBtn/IncrementGoodsBtn';
import RemoveGoodsBtn from '../../ui/Button/RemoveGoodsBtn/RemoveGoodsBtn';
import MainBasketItem from './MainBasketItem/MainBasketItem';

const BasketItem = ({ id, title, price, img, col }) => {
  return (
    <div className='flex flex-col sm:flex-row mb-4 last:mb-0 border-2 border-black dark:border-gray-400 justify-between px-6 py-4'>
      <MainBasketItem id={id} img={img} title={title} price={price} />
      <div className='flex items-center mt-4 sm:mt-0'>
        <div className='flex items-center'>
          <DecrementGoodsBtn id={id} />
          <h2 className='m-0 p-0 mr-2 dark:text-white'>{col}</h2>
          <IncrementGoodsBtn id={id} />
        </div>
        <RemoveGoodsBtn id={id} />
      </div>
    </div>
  );
};

export default BasketItem;
