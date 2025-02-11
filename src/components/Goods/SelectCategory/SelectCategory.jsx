import React, {useState} from 'react';
import {useGetCategoryQuery} from '../../../redux/goodsApi';
import Spinner from '../../../ui/Spinner/Spinner';
import {useDispatch} from 'react-redux';
import {changeCategory} from '../../../redux/features/initialGoods/initialGoodsSlice';

const SelectCategory = () => {
	const dispatch = useDispatch();
	const {data = [], isLoading} = useGetCategoryQuery();
	const [categories, setCategories] = useState('Все товары')
	
	
	const handleChange = (e) => {
		dispatch(changeCategory(e.target.value));
		setCategories(e.target.value)
	};
	
	
	
	if (isLoading) return <Spinner/>;
	
	return (
		<div className='flex items-center overflow-hidden px-6'>
			<select
				name='category'
				onChange={handleChange}
				className='px-6 py-4 bg-slate-100 cursor-pointer sm:ml-10 w-fit rounded-l-full pr-6'
			>
				{data?.map((item) => {
					return (
						<option key={item.id} value={item.name}>
							{item.visibleName}
						</option>
					);
				})}
			</select>
			<h1
				className='m-0 ml-6 uppercase text-[12px] sm:text-[15px] text-gray-400'>{categories.length > 0 ? categories : 'Все товары'}</h1>
		</div>
	);
};

export default SelectCategory;
