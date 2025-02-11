import { useLocation, useNavigate, useParams } from 'react-router'
import CarouselImages from '../components/SingleGoods/CarouselImages/CarouselImages'
import MainInformation from '../components/SingleGoods/MainInformation/MainInformation'
import { useGetSingleGoodsQuery } from '../redux/goodsApi'
import GoBackBtn from '../ui/Button/GoBackBtn/GoBackBtn'
import Spinner from '../ui/Spinner/Spinner'
import ListReviews from "../components/SingleGoods/ListReviews/ListReviews";

const SingleGoods = () => {
	let dataLocation = useLocation()
	const { id } = useParams()
	const navigate = useNavigate()

	const { data = [], isLoading } = useGetSingleGoodsQuery(id)
	const { title, price, images, description } = data

	if (isLoading) return <Spinner />

	const goGoods = () => navigate('/goods')
	const goBack = () => navigate(-1)

	return (
		<>
		<div className='flex my-8 px-6 flex-col justify-center sm:flex-row'>
			{dataLocation.state != null ? (
				<GoBackBtn onClick={goBack} />
			) : (
				<GoBackBtn onClick={goGoods} />
			)}
			<CarouselImages images={images} title={title} />
			<MainInformation
				title={title}
				description={description}
				price={price}
				id={id}
				data={data}
			/>
		</div>
			<div className=' max-w-[1280px] m-auto justify-center  pt-10 pb-10 '>
				<ListReviews title={title} />
			</div>
		</>
	)
}

export default SingleGoods
