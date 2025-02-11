import { message } from 'antd';

export const list = [
  'React',
  'Redux-toolkit',
  'TRK-query',
  'Redux-persist',
  'React-router-dom',
  'JSON Server',
  'AntDesign',
  'Tailwind CSS',
  'JavaScript',
];

export const errorMessageLogin = () => {
  message.error('Войдите в профиль', [1]);
};
export const successAddInBasket = () => {
  message.success('Товар успешно добавлен в корзину', [1]);
};
export const alreadyInBasket = () => {
  message.error('Товар уже есть в корзине', [1]);
};
export const successAddCategories = () => {
  message.success('Категория добавлена!', [1]);
};
export const errorAddCategories = () => {
  message.error('Заполните все данные!', [1]);
};
export const successAddGoods = () => {
  message.success('Товар добавлен!', [1]);
};
export const errorAddGoods = () => {
  message.error('Заполните все данные!', [1]);
};
export const errorAddPrice = () => {
  message.error('Cтоимость товара не может быть отрицательной!', [1]);
};
export const successConfirm = () => {
  message.success('Заказ успешно оформлен!', [1]);
};
export const successRemove = () => {
  message.success('Товар успешно удален!', [1]);
};
export const successAdd = () => {
  message.success('+1', [1]);
};
export const successChangeGoods = () => {
  message.success('Товар отредактирован!', [1]);
};
export const successMessageAdmin = () => {
  message.success('Вы пошли как администратор', [1]);
};
export const successMessageCustomer = () => {
  message.success('Вы пошли как пользователь', [1]);
};
export const errorMessage = () => {
  message.error('Введите коректный логин и пароль или зарегистрирустесь', [1]);
};
export const errorUserLogIn = () => {
  message.error('Сначала нужный выйти из профиля, чтобы зайти в новый', [1]);
};
