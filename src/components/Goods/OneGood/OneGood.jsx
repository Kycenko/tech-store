import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import AddGoodsBtn from '../../../ui/Button/AddGoodsBtn/AddGoodsBtn';

import '../../../utils/list';

const OneGood = ({data}) => {
	const auth = useSelector((state) => state.users.auth);

	
	return (
		<div className='p-4 flex flex-wrap gap-4 justify-center '>
			{data?.map((item) => {
				const {id, title, price, images, category} = item;
				return (
					<div
						key={item.id}
						className='border-2 border-gray-800 rounded-md dark:border-gray-300 p-4 w-[300px] min-h-[300px] hover:scale-105 duration-200'
					>
						<Link key={item.id} to={`/goods/${id}`}>
							<img src={images[0]} alt={title} className='object-cover max-w-[250px]'/>
							<h2 className='text-center m-0 mt-2 text-[20px] dark:text-white'>{title}</h2>
							<h2 className='uppercase m-0 mb-2 text-[12px] text-gray-400'>{category}</h2>
						</Link>
						<div>
							<div className='flex justify-between items-center'>
								<h2 className='m-0 text-[15px] font-bold dark:text-white'>
									{price} <span className='m-0'>BR</span>
								</h2>
								{auth ? null : <AddGoodsBtn text={'В корзину'} id={id} goods={item}/>}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OneGood;
