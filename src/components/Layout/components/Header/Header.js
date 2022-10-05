import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faMagnifyingGlass, faPlus, faSpinner } from '@fortawesome/free-solid-svg-icons'
import classNames from 'classnames/bind'
import Tippy from '@tippyjs/react/headless'

import styles from './Header.module.scss'
import images from '~/assets'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import AccountItem from '~/components/AccountItem/AccountItem'
import Button from '~/components/Button/Button'

const cx = classNames.bind(styles)

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

                <Tippy
                    visible={searchResult.length > 0}
                    interactive
                    zIndex={999}
                    render={(attrs) => (
                        <div className={cx('search-result')} {...attrs} tabIndex="-1">
                            <PopperWrapper>
                                <h4 className={cx('search-title')}>Accounts</h4>
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                                <AccountItem />
                            </PopperWrapper>
                        </div>
                    )}
                >
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
                </Tippy>

                <div className={cx('actions')}>
                    <Button original leftIcon={<FontAwesomeIcon icon={faPlus} />}>
                        Upload
                    </Button>

                    <Button primary>Log in</Button>
                </div>
            </div>
        </header>
    )
}

export default Header
