import classNames from 'classnames/bind';
import styles from './Checkout.module.scss';
import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';
import HeaderPath from '~/components/Layout/components/HeaderPath';

const cx = classNames.bind(styles);

function Checkout() {
    return (
        <>
            <Header />
            <HeaderPath text1="Checkout" />
            <h1>Checkout</h1>
            <Footer />
        </>
    );
}
export default Checkout;
