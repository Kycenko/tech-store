import React from 'react'
import { useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import BasketItem from '../components/BasketItem/BasketItem'
import { useGetUsersQuery } from '../redux/goodsApi'
import ConfirmDilivery from '../ui/Button/ConfirmDilivery/ConfirmDilivery'
import Spinner from '../ui/Spinner/Spinner'

const BasketPage = () => {
	const user = useSelector(state => state.users.lkUser)

	const { data = [], isLoading } = useGetUsersQuery(user.id)
	let result = data.find(item => item.id === user.id)

	if (isLoading) return <Spinner />

	return (
		<div className='p-6 max-w-[1280px] mx-auto pb-16'>
			<h1 className='text-[20px] sm:text-[30px] flex justify-center font-[700] dark:text-white'>
				Товаров в корзине на сумму: {result.GeneralsumInBasket} BR
			</h1>
			{result.basket.item?.map(item => {
				const { id, title, price, img, col } = item
				return (
					<BasketItem
						key={uuidv4()}
						id={id}
						title={title}
						price={price}
						img={img}
						col={col}
					/>
				)
			})}
			{result.GeneralsumInBasket > 0 ? <ConfirmDilivery result={result} /> : ''}
		</div>
	)
}

export default BasketPage
