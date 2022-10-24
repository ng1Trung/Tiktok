import classNames from 'classnames/bind'
import { useState } from 'react'
import { forwardRef } from 'react'
import images from '~/assets'
import styles from './Image.module.scss'

const cx = classNames.bind(styles)

const Image = forwardRef(({ src, className, fallback: customFallback = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')

    const handleError = () => {
        setFallback(customFallback)
    }

    return <img className={cx('wrapper', className)} ref={ref} src={fallback || src} {...props} onError={handleError} />
})

export default Image
