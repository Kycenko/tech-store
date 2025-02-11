import React, { useState } from 'react';
import { MdModeEdit } from 'react-icons/md';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import AddGoodsBtn from '../../../ui/Button/AddGoodsBtn/AddGoodsBtn';
import {
	useAddReviewMutation,
	useDeleteGoodsMutation,
	useGetGoodsQuery,
	useGetSingleUserQuery,
} from '../../../redux/goodsApi';
import { Modal } from 'antd';
import { errorAddGoods } from '../../../utils/list';

const MainInformation = ({ title, description, price, id, data }) => {
	const user = useSelector((state) => state.users.lkUser);
	const navigate = useNavigate();
	const auth = useSelector((state) => state.users.auth);
	const authCustomer = useSelector((state) => state.users.authCustomer);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [rating, setRating] = useState('1');
	const [comment, setComment] = useState('');
	const [addReview] = useAddReviewMutation();
	const { data: users = [] } = useGetSingleUserQuery(user.id);
	const { data: goods = [] } = useGetGoodsQuery();
	const [deleteGoods] = useDeleteGoodsMutation();
	const ratingArr = [
		{ id: 1, rate: 1 },
		{ id: 2, rate: 2 },
		{ id: 3, rate: 3 },
		{ id: 4, rate: 4 },
		{ id: 5, rate: 5 },
	];
	
	const showModal = () => {
		if (!authCustomer) {
			navigate('/login');
		} else {
			setIsModalOpen(true);
		}
	};
	
	const handleOk = async () => {
		if (!comment) {
			errorAddGoods();
		} else {
			await addReview({
				name: user.name,
				title: title,
				rating: rating,
				comment: comment,
			}).unwrap();
			setRating('');
			setComment('');
			setIsModalOpen(false);
		}
	};
	
	const handleDeleteGoods = async (id) => {
		try {
			await deleteGoods(id).unwrap();
			navigate('/goods');
		} catch (error) {}
	};
	
	
	
	return (
		<div className="flex flex-col text-center items-center justify-center px-8 py-6">
			<h2 className="text-3xl mt-3 text-center dark:text-white">{title}</h2>
			<div className="max-w-xs">
				<p className="dark:text-white break-words whitespace-normal">{description}</p>
			</div>
			<div className="mt-3">
				<h2 className="text-2xl  dark:text-white">{price} BR</h2>
				<AddGoodsBtn text="Добавить в корзину" id={id} goods={data} />
				{!auth ? (
					<button
						className="px-6 py-2 rounded-3xl bg-blue-200 hover:bg-blue-300 duration-200 dark:bg-slate-200 dark:hover:bg-gray-400"
						onClick={showModal}
					>
						Добавить отзыв
					</button>
				) : null}
				<Modal
					title="Оставьте ваш отзыв"
					open={isModalOpen}
					onOk={handleOk}
					onCancel={() => setIsModalOpen(false)}
					cancelText={'Закрыть'}
					okButtonProps={{ style: { backgroundColor: '#4096ff' } }}
					okText={'Отправить'}
				>
					<div className="flex pb-2 justify-center flex-col">
						<label>Имя: {user.name}</label>
						<label>Название товара: {title}</label>
						<div className="flex items-center">
							<label>Рейтинг: </label>
							<select
								onChange={(e) => setRating(e.target.value)}
								value={rating}
								className="bg-slate-100 ml-2 cursor-pointer w-fit rounded-md"
							>
								{ratingArr.map((rate) => (
									<option key={rate.id} value={rate.rate}>
										{rate.rate}
									</option>
								))}
							</select>
						</div>
						<p>Комментарий:</p>
						<textarea
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							className="bg-slate-100 rounded-md"
							name=""
							id=""
							rows="5"
						></textarea>
					</div>
				</Modal>
				
				{auth ? (
					<Link to={`/goods/${id}/edit`} state={{ id: id }} className="flex  items-center mt-4">
						<MdModeEdit className="mr-2" />
						Редактировать товар
					</Link>
				) : null}
				{auth ? (
					<button
						className="bg-red-400 text-black dark:text-white rounded-full p-2 mt-4 mb-10"
						onClick={() => handleDeleteGoods(id)}
					>
						Удалить товар
					</button>
				) : null}
			</div>
		</div>
	);
};

export default MainInformation;
