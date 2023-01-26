import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({
    to,
    href,
    text = false,
    primary = false,
    outline = false,
    rounded = false,
    disable = false,
    small = false,
    large = false,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) {
    let Compo = 'button';
    const props = {
        onClick,
        ...passProps,
    };

    if (disable) {
        delete props.onClick;
    }

    if (to) {
        props.to = to;
        Compo = Link;
    } else if (href) {
        props.href = href;
        Compo = 'a';
    }

    const classes = cx('wrapper', {
        [className]: className,
        text,
        primary,
        outline,
        disable,
        rounded,
        small,
        large,
    });

    return (
        <Compo className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            {children}
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Compo>
    );
}

export default Button;
