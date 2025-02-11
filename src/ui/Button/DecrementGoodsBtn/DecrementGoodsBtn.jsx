import { MdRemove } from 'react-icons/md';
import { successRemove } from '../../../utils/list'
import { useSelector } from 'react-redux';
import {
  useGetSingleUserQuery,
  useIncrementGoodsInBasketMutation,
  useRemoveGoodsInBasketMutation,
} from '../../../redux/goodsApi';
import Spinner from '../../Spinner/Spinner';

const DecrementGoodsBtn = ({ id }) => {
  const user = useSelector((state) => state.users.lkUser);
  let { data = [] } = useGetSingleUserQuery(user.id);

  const [addProductInBasket, { isLoading }] =
    useIncrementGoodsInBasketMutation();

  const [RemoveProductInBasket] = useRemoveGoodsInBasketMutation();

  const handleDecrementColGoodsInBasket = async () => {
    let indexItem = data.basket.item.findIndex((item) => item.id === id);
    let basketUser = [...data.basket.item.filter((item) => item.id !== id)];
    let targetGoods = {
      ...data.basket.item.filter((item) => item.id === id)[0],
    };
    if (targetGoods.col > 1) {
      targetGoods.col = targetGoods.col - 1;

      let newBasketUser = [...basketUser];
      newBasketUser.splice(indexItem, 0, targetGoods);

      let generalSum = data.GeneralsumInBasket - targetGoods.price;
      successRemove();
      await addProductInBasket({
        idUser: user.id,
        item: newBasketUser,
        generalSum: generalSum,
      }).unwrap();
    } else {
      let result = data.basket.item.filter((item) => item.id != id);
      let targetGoods = data.basket.item.filter((item) => item.id == id);
      let sum = data.GeneralsumInBasket - targetGoods[0].price * targetGoods[0].col;
      successRemove();
      await RemoveProductInBasket({
        id: data.id,
        data: result,
        sum: sum,
      }).unwrap();
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <button
      onClick={handleDecrementColGoodsInBasket}
      className='mr-2 p-2 rounded-3xl bg-gray-200 hover:bg-gray-400 hover:text-white duration-200'
    >
      <MdRemove />
    </button>
  );
};

export default DecrementGoodsBtn;
