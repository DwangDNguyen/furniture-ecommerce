import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('footer')}>
            <h5>
                © 2022 <span>ComfySloth </span>
            </h5>
            <h5>All rights reserved</h5>
        </div>
    );
}

export default Footer;
