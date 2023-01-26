import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Button from '~/components/Button';

import {
    addProduct,
    clearCart,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    calculateTotals,
} from '~/redux/cartRedux';
const cx = classNames.bind(styles);

function CartItem({ cart, quantity, currentUser }) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(calculateTotals());
    }, [cart.products]);
    return (
        <>
            <div className={cx('cart-title')}>
                <div className={cx('cart-title-container')}>
                    <h5>item</h5>
                    <h5>price</h5>
                    <h5>quantity</h5>
                    <h5>subtotal</h5>
                    <span></span>
                </div>
                <hr></hr>
            </div>
            {cart.products.map((product, index) => {
                const { id, color } = product;
                return (
                    <div key={index}>
                        <article className={cx('product-cart-item')}>
                            <div className={cx('product-cart-title')}>
                                <img src={product.images[0].url} alt={product.name} />
                                <div>
                                    <h5 className={cx('name')}>{product.name}</h5>
                                    <p className={cx('color')}>
                                        color : <span style={{ background: `${product.color}` }}></span>
                                    </p>
                                </div>
                            </div>
                            <h5 className={cx('price')}>${Math.round((product.price / 100) * 100) / 100}</h5>
                            <div className={cx('handle-quantity')}>
                                <button
                                    className={cx('amount-btn', 'decr')}
                                    onClick={() => {
                                        if (product.quantity === 1) {
                                            dispatch(deleteProduct({ id, color }));
                                        }
                                        dispatch(decreaseProduct(product.id));
                                    }}
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                    </svg>
                                </button>
                                <h2 className={cx('amount')}>{product.quantity}</h2>
                                <button
                                    className={cx('amount-btn', 'incr')}
                                    onClick={() =>
                                        product.quantity < product.stock ? dispatch(increaseProduct(product.id)) : null
                                    }
                                >
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 448 512"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path>
                                    </svg>
                                </button>
                            </div>
                            <h5 className={cx('subtotal')}>
                                ${Math.round(((product.price * product.quantity) / 100) * 100) / 100}
                            </h5>
                            <button className={cx('remove-btn')} onClick={() => dispatch(deleteProduct({ id, color }))}>
                                <svg
                                    stroke="currentColor"
                                    fill="currentColor"
                                    strokeWidth="0"
                                    viewBox="0 0 448 512"
                                    height="1em"
                                    width="1em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"></path>
                                </svg>
                            </button>
                        </article>
                        <hr></hr>
                    </div>
                );
            })}

            <div className={cx('link-container')}>
                <a href="/products" className={cx('link-btn')}>
                    continue shopping
                </a>
                <button
                    className={cx('clear-btn')}
                    onClick={() => {
                        dispatch(clearCart());
                    }}
                >
                    clear shopping cart
                </button>
            </div>
            <section className={cx('price-order')}>
                <div>
                    <article>
                        <h5>
                            subtotal : <span>${Math.round((cart.total / 100) * 100) / 100}</span>
                        </h5>
                        <p>
                            Shipping fee : <span>$5.34</span>
                        </p>
                        <hr></hr>
                        <h4>
                            order total :<span>${(Math.round((cart.total / 100) * 100) / 100 + 5.34).toFixed(2)}</span>
                        </h4>
                    </article>
                    {currentUser ? (
                        <Button href="/checkout" className={cx('buy-btn')}>
                            proceed to checkout
                        </Button>
                    ) : (
                        <Button href="/login" className={cx('buy-btn')}>
                            proceed to checkout
                        </Button>
                    )}
                </div>
            </section>
        </>
    );
}
export default CartItem;
