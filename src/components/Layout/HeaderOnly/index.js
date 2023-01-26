import Header from '~/components/Layout/components/Header';
import Footer from '~/components/Layout/components/Footer';

import classNames from 'classnames/bind';
import styles from './HeaderOnly.module.scss';

const cx = classNames.bind(styles);
function HeaderOnly({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className="content">{children}</div>
            <Footer />
        </div>
    );
}

export default HeaderOnly;
