import {useDispatch, useSelector} from 'react-redux';
import { searchName } from '../../../redux/features/initialGoods/initialGoodsSlice';
import { Input } from 'antd';
import '../../../utils/list';
import { SearchOutlined } from "@ant-design/icons";
import React from "react";

const SearchTitle = () => {
  const dispatch = useDispatch();
  
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      dispatch(searchName(e.target.value));
    }
    if (e.target.value.length < 1) {
      dispatch(searchName(e.target.value))
    }
  };
  
  return (
    <div className="flex justify-center relative">
      <Input
        prefix={<SearchOutlined />}
        onKeyUp={handleSearch}
        className=" w-[90%] px-6 py-2 h-[50px]  rounded-full ml-2 mr-2 mt-2 mb-4"
        placeholder="Поиск товара по названию"
      />
     
    </div>
  );
};

export default SearchTitle;
