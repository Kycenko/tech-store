import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router'
import FormLogin from '../components/FormLogin/FormLogin'
import {
	logInAdmin,
	logInCustomer,
} from '../redux/features/initialUsers/initialUsersSlice'
import { useGetUsersQuery } from '../redux/goodsApi'
import Spinner from '../ui/Spinner/Spinner'
import {
	errorMessage,
	errorUserLogIn,
	successMessageAdmin,
	successMessageCustomer,
} from '../utils/list'

const LoginPage = () => {
	const { data = [], isLoading } = useGetUsersQuery()
	const navigate = useNavigate()
	const location = useLocation()
	const dispatch = useDispatch()

	const auth = useSelector(state => state.users.auth)
	const authCustomer = useSelector(state => state.users.authCustomer)

	const users = data

	const fromPage = location.state?.from?.pathname || '/'

	const handleSubmit = event => {
		event.preventDefault()
		const form = event.target
		const login = form.userName.value
		const password = form.userPassword.value

		let user = users.find(
			item => item.password === password && item.name === login
		)
		if (auth === true || authCustomer === true) {
			errorUserLogIn()
		} else {
			if (user !== undefined) {
				if (user.role === 'customer') {
					successMessageCustomer()
					dispatch(logInCustomer(user))
					navigate(fromPage)
				}
				if (user.role === 'admin') {
					successMessageAdmin()
					dispatch(logInAdmin(user))
					navigate(fromPage)
				}
			} else {
				errorMessage()
			}
		}
	}

	if (isLoading) {
		return <Spinner />
	}

	return <FormLogin onSubmit={handleSubmit} />
}

export default LoginPage
