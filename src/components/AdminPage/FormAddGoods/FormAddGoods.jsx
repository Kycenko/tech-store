import React, { useState } from 'react';
import { useAddGoodsMutation, useGetCategoryQuery } from '../../../redux/goodsApi';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../../../ui/Spinner/Spinner';
import {successAddGoods, errorAddGoods, errorAddPrice} from '../../../utils/list';
import AddButton from '../../../ui/Button/AddButton/AddButton';
import InputText from '../../../ui/Input/InputText';

const FormAddGoods = () => {
  const [addGoods, isLoading] = useAddGoodsMutation();

  const { data = [] } = useGetCategoryQuery();
  let allCategories = data.slice(1);

  const [img, setImg] = useState([1, 2, 3]);

  const handleAddGoods = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let title = e.target.title.value;
    let price = Number(e.target.price.value);
    let description = e.target.description.value;
    let category = e.target.category.value;
    let img1 = e.target.img1.value;
    let img2 = e.target.img2.value;
    let img3 = e.target.img3.value;
    if (
      title === '' ||
      price === 0 ||
      description === '' ||
      category === '' ||
      img1 === '' ||
      img2 === '' ||
      img3 === ''
    ) {
      errorAddGoods()
    }
     else if (price <= 0 )
      {
        errorAddPrice()
      }
     else {
      successAddGoods();
      let images = [];
      images.push(img1, img2, img3);
      await addGoods({
        title: title,
        price: price,
        description: description,
        category: category,
        images: images,
      }).unwrap();
      e.target.title.value = '';
      e.target.price.value = '';
      e.target.description.value = '';
      e.target.category.value = '';
      e.target.img1.value = '';
      e.target.img2.value = '';
      e.target.img3.value = '';
    }
  };

  if (!isLoading) return <Spinner />;

  return (
    <div className='flex flex-col items-center'>
      <div className='mb-6 text-[20px] dark:text-white'>Форма для добавления товара</div>
      <form
        onSubmit={handleAddGoods}
        className='flex flex-col max-w-[500px] border-2 p-6'
      >
        <InputText
          labelName={'Название товара'}
          type={'text'}
          name={'title'}
          placeholder={'Введите название товара'}
        />
        <InputText
          labelName={'Стоимость товара'}
          type={'number'}
          name={'price'}
          placeholder={'Введите стоимость товара'}
        />
        <InputText
          labelName={'Описание товара'}
          type={'text'}
          name={'description'}
          placeholder={'Введите описание товара'}
        />
        <label className='mb-2'>
          <span className='dark:text-white'>Категория товара:</span>
          <select
            name='category'
            className='px-6 py-4 bg-slate-100 w-full rounded-full'
          >
            {allCategories?.map((item) => {
              return (
                <option key={uuidv4()} value={item.name}>
                  {item.visibleName}
                </option>
              );
            })}
          </select>
        </label>
        <label className='mb-2 '>
          <span className='dark:text-white'>Изображения товара:</span>
          {img?.map((item) => {
            return (
              <input
                key={uuidv4()}
                type='text'
                name={`img${item}`}
                className='w-full bg-slate-100 px-6 py-2 rounded-full mb-2 '
                placeholder='URL изображения'
              />
            );
          })}
        </label>
        <AddButton text={'Добавить товар'} />
      </form>
    </div>
  );
};

export default FormAddGoods;
