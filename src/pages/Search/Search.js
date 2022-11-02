import HeadlessTippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'
import { useState, useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleXmark, faSpinner } from '@fortawesome/free-solid-svg-icons'

import styles from './Search.module.scss'
import * as searchServices from '~/apiServices/searchServices'
import { SearchIcon } from '~/components/Icons/Icons'
import AccountItem from '~/components/AccountItem/AccountItem'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import { useDebounce } from '~/hooks'

const cx = classNames.bind(styles)

const Search = () => {
    const [searchValue, setSearchValue] = useState('')
    const [searchResult, setSearchResult] = useState([])
    const [showResult, setShowResult] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const inputRef = useRef()

    const debounced = useDebounce(searchValue, 500)

    const handleClear = () => {
        setSearchValue('')
        setSearchResult([])
        inputRef.current.focus()
    }

    const handleHideResult = () => {
        setShowResult(false)
    }

    const handleChange = (e) => {
        const value = e.target.value

        if (!value.startsWith(' ')) {
            setSearchValue(value)
        }
    }

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([])
            return
        }

        const fetchApi = async () => {
            setIsLoading(true)

            const result = await searchServices.search(debounced)

            setSearchResult(result)

            setIsLoading(false)
        }

        fetchApi()

        setIsLoading(true)
    }, [debounced])

    return (
        //<div> wrapper to fix bug tippy
        <div>
            <HeadlessTippy
                interactive
                visible={showResult && searchResult.length > 0}
                render={(attrs) => (
                    <div className={cx('search-result')} {...attrs} tabIndex="-1">
                        <PopperWrapper>
                            <h4 className={cx('search-title')}>Accounts</h4>
                            {searchResult.map((result) => (
                                <AccountItem key={result.id} data={result} />
                            ))}
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
                        onChange={handleChange}
                    />

                    {!!searchValue && !isLoading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FontAwesomeIcon icon={faCircleXmark} />
                        </button>
                    )}

                    {isLoading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <SearchIcon />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    )
}

export default Search
