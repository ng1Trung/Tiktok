import classNames from 'classnames/bind'
import { Link } from 'react-router-dom'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

const Button = ({
    to,
    href,
    leftIcon,
    rightIcon,
    onClick,
    children,
    className,
    small = false,
    large = false,
    rounded = false,
    primary = false,
    outline = false,
    original = false,
    disabled = false,
    ...otherProps
}) => {
    let Component = 'button'
    const classes = cx('wrapper', {
        small,
        large,
        primary,
        outline,
        rounded,
        original,
        disabled,
        [className]: className,
    })
    const props = {
        onClick,
        ...otherProps,
    }

    if (disabled) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') {
                delete props[key]
            }
        })
    }

    if (to) {
        props.to = to
        Component = Link
    } else if (href) {
        props.href = href
        Component = 'a'
    }

    return (
        <Component className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}

            <span className={cx('title')}>{children}</span>

            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Component>
    )
}

export default Button
