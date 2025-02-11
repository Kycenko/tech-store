import React from 'react';
import {useDeleteReviewMutation, useGetGoodsQuery, useGetReviewsQuery} from '../../../redux/goodsApi';
import Spinner from '../../../ui/Spinner/Spinner';
import {Collapse} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';

const ListReviews = ({title}) => {
	const {data = [], isLoading} = useGetReviewsQuery({title: title});
	const [deleteReview] = useDeleteReviewMutation();
	
	const user = useSelector((state) => state.users.authCustomer);
	const admin = useSelector((state) => state.users.auth);
	const isUserReview = useSelector((state) => state.users.lkUser);
	
	const handleDeleteReview = async (id) => {
		await deleteReview(id).unwrap();
	};
	
	const {Panel} = Collapse;
	if (isLoading) return <Spinner/>;
	return (
		<div className="my-10 ml-5 mr-5">
			<Collapse
				bordered={true}
				defaultActiveKey={['0']}
				expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
				className="site-collapse-custom-collapse"
			>
				<Panel header={'Список отзывов'} key="1" className="site-collapse-custom-panel">
					{data?.map((review) => {
						if (review.title === title) {
							return (
								<div className="flex flex-col mb-4 border-b-2 last:border-b-0" key={review.id}>
									<div>
										<p className="dark:text-black">
											Имя: <span className="text-gray-400 text-[16px]">{review.name}</span>
										</p>
										<p className="dark:text-black">
											Название товара: <span className="text-gray-400 text-[16px]">{review.title}</span>
										</p>
										<p className="dark:text-black">
											Рейтинг: <span className="text-gray-400 text-[16px]">{review.rating}</span>
										</p>
										<p className="dark:text-black">
											Комментарий: <span className="text-gray-400 text-[16px]">{review.comment}</span>
										</p>
									</div>
									{(user && review.name === isUserReview.name) || admin ? (
										<div className="flex justify-end mb-3">
											<button
												onClick={() => handleDeleteReview(review.id)}
												className="px-6 py-2 mt-2 rounded-3xl bg-red-200 hover:bg-red-300 duration-200 dark:bg-red-400 dark:hover:bg-red-500"
											>
												Удалить
											</button>
										</div>
									) : null}
								</div>
							);
						}
						return null;
					})}
				</Panel>
			</Collapse>
		</div>
	);
};

export default ListReviews;
