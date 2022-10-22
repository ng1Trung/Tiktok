import { useState } from 'react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleQuestion,
    faCircleXmark,
    faEarthAsia,
    faEllipsisVertical,
    faKeyboard,
    faMagnifyingGlass,
    faPlus,
    faSpinner,
} from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import images from '~/assets'
import AccountItem from '~/components/AccountItem/AccountItem'
import Button from '~/components/Button/Button'
import Menu from '~/components/Popper/Menu/Menu'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        // to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

const Header = () => {
    const [searchResult, setSearchResult] = useState([])

    const handleChangeSearchResult = async (e) => {
        setTimeout(() => {
            setSearchResult((pre) => {
                return [...pre, e.target.value]
            })
        }, 500)
    }

    return (
        <header className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <img src={images.logo} alt="Tiktok-logo" />
                </div>

                <Menu>
                    <div className={cx('search')}>
                        <input placeholder="Search accounts and videos" onChange={handleChangeSearchResult} />

                        {/* clear */}
                        <button className={cx('clear')}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>

                        {/* loading */}
                        <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />

                        {/* search */}
                        <button className={cx('search-btn')}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </button>
                    </div>
                </Menu>

                <div className={cx('actions')}>
                    <Button original leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>

                    <Button primary>Log in</Button>

                    <Menu items={MENU_ITEMS}>
                        <button className={cx('more-button')}>
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                        </button>
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
