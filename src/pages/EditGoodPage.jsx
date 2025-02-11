import React from 'react';
import { useLocation, useNavigate } from 'react-router';
import FormEdidGoods from '../components/SingleGoods/FormEdidGoods/FormEdidGoods';
import GoBackBtn from '../ui/Button/GoBackBtn/GoBackBtn';

const EditGoodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = location.state;

  const goBack = () => navigate(`/goods/${id}`);

  return (
    <div className='px-6 my-6 flex'>
      <GoBackBtn onClick={goBack} />
      <FormEdidGoods id={id}/>
    </div>
  );
};

export default EditGoodPage;
