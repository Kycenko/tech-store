import {Modal} from 'antd';
import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import MainBasketItem from '../../../components/BasketItem/MainBasketItem/MainBasketItem';
import {
	useConfirmDiliveryBasketMutation,
	useGetSingleUserQuery,
} from '../../../redux/goodsApi';
import Spinner from '../../Spinner/Spinner';
import {useSelector} from 'react-redux';
import {errorAddGoods, successConfirm} from '../../../utils/list';
import InputText from '../../Input/InputText';

const ConfirmDilivery = ({result}) => {
	const user = useSelector((state) => state.users.lkUser);
	const [removeBasketItem] = useConfirmDiliveryBasketMutation();
	let {data = [], isLoading} = useGetSingleUserQuery(user.id);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [address, setAddress] = useState('');
	const [number, setNumber] = useState('');
	
	const showModal = () => {
		setIsModalOpen(true);
	};
	
	const handleOk = async () => {
		if (!address || !number) {
			errorAddGoods()
		}
		else {
			setIsModalOpen(false);
			successConfirm();
		}
	
		let date = new Date();
		let userHistory = JSON.parse(JSON.stringify(data.history));
		userHistory[date] = {...data.basket.item};
		await removeBasketItem({
			idUser: user.id,
			item: [],
			generalSum: 0,
			history: userHistory,
		}).unwrap();
	};
	
	const handleCancel = () => {
		setIsModalOpen(false);
	};
	
	if (isLoading) return <Spinner/>;
	
	return (
		<>
			<button
				onClick={showModal}
				className="border-2 dark:text-white px-6 py-1 mb-4 rounded-3xl hover:bg-gray-200 dark:hover:bg-gray-400 dark:hover:border-gray-400 duration-200"
			>
				Оформить заказ
			</button>
			<Modal
				title="Подтвердите информацию о заказе"
				open={isModalOpen}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText={'Назад'}
				okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
				okText={'Оформить заказ'}
			>
				<div className="flex pb-2 justify-center flex-col">
					<InputText
						labelName={'Адрес'}
						name={'address'}
						value={address}
						onChange={(e) => setAddress(e.target.value)}
						placeholder={'Введите адрес'}
					/>
					<InputText
						labelName={'Номер телефона'}
						name={'number'}
						value={number}
						onChange={(e) => setNumber(e.target.value)}
						placeholder={'Введите номер телефона'}
					/>
				</div>
				{result.basket.item?.map((item) => {
					const {id, title, price, img, col} = item;
					let resultSum = col * price;
					return (
						<div
							className="flex items-center mb-4 justify-between"
							key={uuidv4()}
						>
							<MainBasketItem
								id={id}
								title={title}
								price={price}
								img={img}
								col={col}
							/>
							<div>
								<h2>{col} шт</h2>
								<h2>Всего: {resultSum} BR</h2>
							</div>
						</div>
					);
				})}
				<h2 className="mt-10 ">Итого: {result.GeneralsumInBasket} BR</h2>
			</Modal>
		</>
	);
};

export default ConfirmDilivery;
