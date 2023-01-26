import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

import Header from '~/components/Layout/components/Header';
// import HeaderPath from '../components/HeaderPath';
import Footer from '~/components/Layout/components/Footer';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>{children}</div>
            <Footer />
        </div>
    );
}

export default DefaultLayout;
