import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import { useContext } from 'react';
import { AuthContext } from '~/context/AuthContext';

import Home from '~/pages/Home';
import About from '~/pages/About';
import Products from '~/pages/Products';
import SingleProduct from '~/pages/SingleProduct';
import Login from '~/pages/Login';
import Cart from '~/pages/Cart';
import Register from '~/pages/Register';
import Checkout from '~/pages/Checkout';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function App() {
    const { currentUser } = useContext(AuthContext);

    return (
        <Router>
            {/* <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        const Page = route.component;
                        return (
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                </Routes>
            </div> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />

                <Route
                    path="/products/:productId"
                    // render={({ match }) => (
                    //   <Product
                    //     product={productsList.find(
                    //       (product) => String(product.id) === match.params.id
                    //     )}
                    //   />
                    // )}
                    element={<SingleProduct />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                {currentUser ? (
                    <Route path="/login" element={<Navigate replace to="/" />} />
                ) : (
                    <Route path="/login" element={<Login />} />
                )}
                {currentUser ? (
                    <Route path="/register" element={<Navigate replace to="/" />} />
                ) : (
                    <Route path="/register" element={<Register />} />
                )}
                {currentUser ? (
                    <Route path="/checkout" element={<Checkout />} />
                ) : (
                    <Route path="/checkout" element={<Navigate replace to="/" />} />
                )}
            </Routes>
        </Router>
    );
}

export default App;
