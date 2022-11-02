import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import { SearchIcon } from '~/components/Icons/Icons'
import AccountItem from '~/components/AccountItem/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'

const cx = classNames.bind(styles)

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)

    const inputRef = useRef()

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3])
        }, 0)
    }, [])

    return (
        <HeadlessTippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={(attrs) => (
                <div className={cx('search-result')} {...attrs} tabIndex="-1">
                    <PopperWrapper>
                        <h4 className={cx('search-title')}>Accounts</h4>
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                        <AccountItem />
                    </PopperWrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Search accounts and videos"
                    spellCheck={false}
                    onFocus={() => {
                        setShowResult(true)
                    }}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
                {!!searchValue && (
                    /* clear */
                    <button className={cx('clear')} onClick={handleClear}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </button>
                )}

                {/* loading */}
                {/* <FontAwesomeIcon className={cx('loading')} icon={faSpinner} /> */}

                {/* search */}
                <button className={cx('search-btn')}>
                    <SearchIcon />
                </button>
            </div>
        </HeadlessTippy>
    )
}

export default Search
