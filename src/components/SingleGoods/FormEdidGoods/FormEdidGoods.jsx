import AddButton from '../../../ui/Button/AddButton/AddButton';
import {successChangeGoods} from '../../../utils/list';
import {
	useChangeSingleGoodsMutation, useGetCategoryQuery,
	useGetSingleGoodsQuery,
} from '../../../redux/goodsApi';
import Spinner from '../../../ui/Spinner/Spinner';
import InputText from '../../../ui/Input/InputText'
import React, {useState} from "react";

const FormEdidGoods = ({id}) => {
	const {data: goods = []} = useGetSingleGoodsQuery(id);
	const [changeGoods, isLoading] = useChangeSingleGoodsMutation();
	const [selectedCategory, setSelectedCategory] = useState(goods.category);
	const [images, setImages] = useState(goods.images);
	
	
	const {data: category = []} = useGetCategoryQuery();
	let allCategories = category.slice(1)

	const handleImageChange = (e, index) => {
		const newImages = [...images];
		newImages[index] = e.target.value;
		setImages(newImages);
	};
	
	
	const handleSubmit = async (e) => {
		successChangeGoods();
		e.preventDefault();
		e.stopPropagation();
		let title = e.target.title.value === '' ? goods.title : e.target.title.value;
		let description =
			e.target.description.value === ''
				? goods.description
				: e.target.description.value;
		let price =
			e.target.price.value === '' ? goods.price : Number(e.target.price.value);
		await changeGoods({
			idGoods: goods.id,
			newTitle: title,
			newPrice: price,
			newDescription: description,
			newCategory: selectedCategory,
			newImages: images,
		}).unwrap();
		e.target.title.value = '';
		e.target.description.value = '';
		e.target.price.value = '';
	};
	
	if (!isLoading) return <Spinner/>;
	
	return (
		<div className='max-w-[1280px] mx-auto pb-16'>
		<form onSubmit={handleSubmit} className='flex flex-col w-full border-2 p-6'>
			<h1 className='m-0 mb-2 cursor-default'>
				ID: <span className='text-gray-400'>{goods.id}</span>
			</h1>
			<InputText
				labelName={'НАЗВАНИЕ'}
				type={'text'}
				name={'title'}
				placeholder={goods.title}
			/>
			<InputText
				labelName={'ЦЕНА'}
				type={'text'}
				name={'price'}
				placeholder={goods.price}
			/>
			<InputText
				labelName={'ОПИСАНИЕ'}
				type={'text'}
				name={'description'}
				placeholder={goods.description}
			/>
			<div className='flex items-center'>
				<h1 className='mb-2 mr-2 cursor-default'>
					КАТЕГОРИЯ:{' '}
				</h1>
				<select
					name='category'
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className='px-3 py-3 bg-slate-100  cursor-pointer w-fit rounded-md'
				>
					{allCategories?.map((item) => {
						return (
							<option key={item.id} value={item.name}>
								{item.visibleName}
							</option>
						);
					})}
				</select></div>
			<label className="mt-2">
				<span className="dark:text-white">Изображения товара:</span>
				{images?.map((item, index) => (
					<input
						key={index}
						type="text"
						name={`img${index}`}
						className="w-full bg-slate-100 px-6 py-2 rounded-full mb-3"
						placeholder={goods.images}
						onChange={(e) => handleImageChange(e, index)}
					/>
				))}
			</label>
			<AddButton text={'Изменить'}/>
		</form>
		</div>
	);
};

export default FormEdidGoods;
