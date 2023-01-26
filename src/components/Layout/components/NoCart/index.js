import classNames from 'classnames/bind';
import styles from './NoCart.module.scss';
const cx = classNames.bind(styles);

function NoCart() {
    return (
        <>
            <h1>Your cart is empty</h1>
            <div className={cx('fill-btn')}>
                <a href="/products" className={cx('fill')}>
                    fill it
                </a>
            </div>
        </>
    );
}

export default NoCart;
