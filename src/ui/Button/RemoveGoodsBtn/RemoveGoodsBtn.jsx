
import { MdClear } from 'react-icons/md';
import { successRemove } from '../../../utils/list'
import { useSelector } from 'react-redux';
import {
  useRemoveGoodsInBasketMutation,
  useGetSingleUserQuery,
} from '../../../redux/goodsApi';
import Spinner from '../../Spinner/Spinner';

const RemoveGoodsBtn = ({ id }) => {
  const user = useSelector((state) => state.users.lkUser);
  const { data = [], } = useGetSingleUserQuery(user.id);

  const [RemoveProductInBasket, { isLoading }] =
    useRemoveGoodsInBasketMutation();

  const handleRemoveGoodsOnBasket = async () => {
    let result = data.basket.item.filter((item) => item.id != id);
    let targetGoods = data.basket.item.filter((item) => item.id == id)
    let sum = data.GeneralsumInBasket - (targetGoods[0].price * targetGoods[0].col)
    successRemove()
    await RemoveProductInBasket({
      id: data.id,
      data: result,
      sum: sum
    }).unwrap();
  };

  if (isLoading) return <Spinner />;

  return (
    <button
      onClick={handleRemoveGoodsOnBasket}
      className='p-2 rounded-3xl bg-red-200 hover:bg-red-400 hover:text-white duration-200'
    >
      <MdClear />
    </button>
  );
};

export default RemoveGoodsBtn;