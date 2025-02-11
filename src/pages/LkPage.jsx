import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import AboutUser from '../components/LkPage/AboutUser/AboutUser'
import HistoryUser from '../components/LkPage/HistoryUser/HistoryUser'
import { useGetSingleUserQuery } from '../redux/goodsApi'
import Spinner from '../ui/Spinner/Spinner'

const LkPage = () => {
	const user = useSelector(state => state.users.lkUser)
	const auth = useSelector(state => state.users.auth)
	const { data = [], isLoading } = useGetSingleUserQuery(user.id)
	const location = useLocation()

	if (isLoading) return <Spinner />

	return (
		<div className='p-4 flex flex-col max-w-[1280px] mx-auto pb-16 '>
			<div className='text-[25px] sm:text-[40px] text-center dark:text-white'>
				Добро пожаловать {data.name} !
			</div>
			<div className='flex flex-col  justify-center text-center'>
				<ul className='py-2 h-full flex sm:flex-row  justify-center items-center text-center flex-col  '>
					{auth ? null : (
						<li
							className={`mb-4 sm:mb-0   ${
								location.pathname === '/lk/history'
									? 'bg-gray-900 text-white text-[20px]  px-4 py-2 rounded-lg mx-2 w-fit'
									: 'bg-gray-600 text-gray-300 text-[20px] hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg mx-2 w-fit'
							}`}
						>
							<Link to='history' className='text-inherit'>
								История заказов
							</Link>
						</li>
					)}

					<li
						className={` ${
							location.pathname === '/lk/about'
								? 'bg-gray-900 dark:bg-gray-600 text-white text-[20px] px-4 py-2 rounded-lg mx-2 w-fit'
								: 'bg-gray-600  text-gray-300 text-[20px] hover:bg-gray-900 hover:text-white px-4 py-2 rounded-lg mx-2 w-fit'
						}`}
					>
						<Link to='about' className='text-inherit'>
							Информация о пользователе
						</Link>
					</li>
				</ul>
				<div className='min-h-[250px] mt-10'>
					<Routes>
						<Route path='history' element={<HistoryUser data={data} />} />
						<Route path='about' element={<AboutUser data={data} />} />
					</Routes>
				</div>
			</div>
		</div>
	)
}

export default LkPage
