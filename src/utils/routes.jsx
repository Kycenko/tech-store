import AdminPage from "../pages/AdminPage";
import BasketPage from "../pages/BasketPage";
import EditGoodPage from "../pages/EditGoodPage";
import GoodsPage from "../pages/GoodsPage";
import LkPage from "../pages/LkPage";
import LoginPage from "../pages/LoginPage";
import NoteFoundPage from "../pages/NoteFoundPage";
import RegistrationPage from "../pages/RegistrationPage";
import SingleGoods from "../pages/SingleGoods";

export const routes = [
  { link: '/goods', component: <GoodsPage /> },
  { link: 'goods/:id', component: <SingleGoods /> },
  { link: 'login', component: <LoginPage /> },
  { link: 'registration', component: <RegistrationPage /> },
  { link: '*', component: <NoteFoundPage /> },
];

export const customerRoutes = [
  { link: 'basket', component: <BasketPage /> },
  { link: 'lk/*', component: <LkPage /> },
];

export const AdminRoutes = [
    { link: 'goods/:id/edit', component: <EditGoodPage /> },
    { link: 'admin/*', component: <AdminPage /> },
  ];
