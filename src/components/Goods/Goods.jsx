import Spinner from '../../ui/Spinner/Spinner';
import MoreGoodsBtn from '../../ui/Button/MoreGoodsBtn/MoreGoodsBtn';
import OneGood from './OneGood/OneGood';
import { useGetGoodsQuery } from '../../redux/goodsApi';
import { useSelector } from 'react-redux';
import SelectCategory from './SelectCategory/SelectCategory';
import SearchTitle from './SearchTitle/SearchTitle';


const Goods = () => {
	const limit = useSelector((state) => state.initialGoods.limit);
	const searchName = useSelector((state) => state.initialGoods.searchName);
	const categoryGoods = useSelector((state) => state.initialGoods.category);
	
	const body = {
		limit: limit,
		category: categoryGoods,
		search: searchName,
	};
	
	const { data: goods = [], isLoading } = useGetGoodsQuery(body);
	
	if (isLoading) return <Spinner />
	
	return (
		<div className='max-w-[1280px] mx-auto pb-16'>
			<SearchTitle />
			<SelectCategory />
			<OneGood data={goods} />
			{goods.length === 0 ? (
				<p className="text-center text-black text-2xl dark:text-white">Товары не найдены!</p>
			) : (
				<div className='text-center'>
					<MoreGoodsBtn />
				</div>
			)}
		</div>
	);
};

export default Goods;
