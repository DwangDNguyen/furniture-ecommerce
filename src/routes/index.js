import { HeaderOnly } from '~/components/Layout';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Products from '~/pages/Products';
import SingleProduct from '~/pages/SingleProduct';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';

import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';

export const publicRoutes = [
    {
        path: '/',
        component: Home,
        // layout: HeaderOnly,
    },

    {
        path: '/about',
        component: About,
    },
    {
        path: '/products',
        component: Products,
    },
    {
        path: '/products/:productId',
        component: SingleProduct,
    },
    {
        path: '/login',
        component: Login,
        layout: null,
    },
    {
        path: '/register',
        component: Register,
        layout: null,
    },
    {
        path: '/cart',
        component: Cart,
    },
];
export const privateRoutes = [];
