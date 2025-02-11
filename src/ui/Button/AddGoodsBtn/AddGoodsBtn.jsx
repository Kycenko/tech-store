import {useSelector} from 'react-redux';
import {
	useAddGoodsInBasketMutation,
	useGetUsersQuery,
} from '../../../redux/goodsApi';
import Spinner from '../../Spinner/Spinner';
import {
	errorMessageLogin,
	successAddInBasket,
	alreadyInBasket,
} from '../../../utils/list';
import AddButton from '../AddButton/AddButton';
import {useNavigate} from "react-router-dom";
import React from "react";

const AddGoodsBtn = ({text, id, goods}) => {
	const auth = useSelector((state) => state.users.auth);
	const authCustomer = useSelector((state) => state.users.authCustomer);
	const user = useSelector((state) => state.users.lkUser);
	
	const {data = []} = useGetUsersQuery(user.id);
	// let result = data.find((item) => item.id == user.id);
	const navigate = useNavigate()
	const [addProductInBasket, {isLoading}] = useAddGoodsInBasketMutation();
	const handleAddProductInBasket = async () => {
		if (auth === false && authCustomer === false) {
			errorMessageLogin();
			navigate('/login');
		}
		if (auth !== false || authCustomer !== false) {
			let userTarget = data.find((item) => item.id === user.id);
			if (userTarget?.basket?.item) {
				let productNumber = userTarget.basket.item.find((item) => item.id === goods.id);
				if (productNumber === undefined) {
					successAddInBasket();
					let result = {
						id: goods.id,
						title: goods.title,
						img: goods.images[0],
						price: goods.price,
						col: 1,
					};
					let previousItems = userTarget.basket.item;
					let arr = [];
					previousItems.forEach((item) => {
						arr.push(item);
					});
					arr.push(result);
					let generalSum = userTarget.GeneralsumInBasket + goods.price;
					await addProductInBasket({
						id: userTarget.id,
						data: arr,
						sum: generalSum,
					}).unwrap();
				} else {
					alreadyInBasket();
				}
			}
		}
	};
	
	if (isLoading) return <Spinner/>;
	
	return auth ? null :
		<div className='mb-4'>
			<AddButton onClick={handleAddProductInBasket} text={'В корзину'}/>
			
		</div>
};

export default AddGoodsBtn;
