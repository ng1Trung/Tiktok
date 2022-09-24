import classNames from 'classnames/bind'
import styles from './DefaultLayout.module.scss'
//components
import Header from '../components/Header/Header'
import Sidebar from './Sidebar/Sidebar'

const cx = classNames.bind(styles)

const DefaultLayout = ({ children }) => {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')}>
                <Sidebar />
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    )
}

export default DefaultLayout
