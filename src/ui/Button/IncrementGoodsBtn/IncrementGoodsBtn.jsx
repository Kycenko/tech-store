
import { MdAdd } from 'react-icons/md';
import { successAdd } from '../../../utils/list'
import { useSelector } from 'react-redux';
import {
  useGetSingleUserQuery,
  useIncrementGoodsInBasketMutation,
} from '../../../redux/goodsApi';
import Spinner from '../../Spinner/Spinner';

const IncrementGoodsBtn = ({ id }) => {
  const user = useSelector((state) => state.users.lkUser);
  let { data = [] } = useGetSingleUserQuery(user.id);

  const [addProductInBasket, { isLoading }] =
    useIncrementGoodsInBasketMutation();

  const handleIncrementColGoodsInBasket = async () => {
    let indexItem = data.basket.item.findIndex(item => item.id == id)

    let basketUser = [...data.basket.item.filter((item) => item.id != id)];
    let targetGoods = {...data.basket.item.filter((item) => item.id == id)[0]};
    targetGoods.col = targetGoods.col + 1

    let newBasketUser = [...basketUser]
    newBasketUser.splice(indexItem, 0, targetGoods)

    successAdd();
    await addProductInBasket({
      idUser: user.id,
      item: newBasketUser,
      generalSum: data.GeneralsumInBasket + targetGoods.price,
    }).unwrap();
  };

  if (isLoading) return <div className='mr-8'><Spinner /></div>;

  return (
    <button
      onClick={handleIncrementColGoodsInBasket}
      className='mr-6 p-2 rounded-3xl bg-gray-200 hover:bg-gray-400 hover:text-white duration-200'
    >
      <MdAdd />
    </button>
  );
};

export default IncrementGoodsBtn;
