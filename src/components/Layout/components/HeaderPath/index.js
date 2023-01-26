import classNames from 'classnames/bind';
import styles from './HeaderPath.module.scss';

import Button from '~/components/Button';

const cx = classNames.bind(styles);

function HeaderPath({ text1, text2 }) {
    return (
        <section className={cx('headerPath')}>
            <div className={cx('headerPath-content')}>
                <Button href="#" className={cx('headerPath-home')}>
                    Home
                </Button>
                <h3>/ {text1}</h3>
                <h3>{text2}</h3>
            </div>
        </section>
    );
}

export default HeaderPath;
