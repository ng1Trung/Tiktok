import { useState } from 'react'
import 'tippy.js/dist/tippy.css'
import Tippy from '@tippyjs/react'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCircleQuestion,
    faCircleXmark,
    faCoins,
    faEarthAsia,
    faEllipsisVertical,
    faGear,
    faKeyboard,
    faMagnifyingGlass,
    faPlus,
    faRightFromBracket,
    faSpinner,
    faUser,
    faVideo,
} from '@fortawesome/free-solid-svg-icons'

import styles from './Header.module.scss'
import images from '~/assets'
import Button from '~/components/Button/Button'
import Menu from '~/components/Popper/Menu/Menu'
import { InboxIcon, MessageIcon } from '~/components/Icons/Icons'
import Image from '~/components/Image/Image'
// import AccountItem from '~/components/AccountItem/AccountItem'

const cx = classNames.bind(styles)

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faEarthAsia} />,
        title: 'English',
        children: {
            title: 'Language',
            data: [
                {
                    type: 'language',
                    code: 'en',
                    title: 'English',
                    children: {
                        title: 'Language',
                        data: [
                            {
                                code: 'en',
                                title: 'English1',
                            },
                            {
                                code: 'vi',
                                title: 'Tiếng Việt2',
                            },
                        ],
                    },
                },
                {
                    type: 'language',
                    code: 'vi',
                    title: 'Tiếng Việt',
                },
            ],
        },
    },
    {
        icon: <FontAwesomeIcon icon={faCircleQuestion} />,
        title: 'Feedback and help',
        to: '/feedback',
    },
    {
        icon: <FontAwesomeIcon icon={faKeyboard} />,
        title: 'Keyboard shortcuts',
    },
]

const userMenu = [
    {
        icon: <FontAwesomeIcon icon={faUser} />,
        title: 'View profile',
        to: '/@sheeppp',
    },
    {
        icon: <FontAwesomeIcon icon={faCoins} />,
        title: 'Get Coins',
        to: '/coins',
    },
    {
        icon: <FontAwesomeIcon icon={faVideo} />,
        title: 'LIVE Studio',
        to: '/live',
    },
    {
        icon: <FontAwesomeIcon icon={faGear} />,
        title: 'Settings',
        to: '/settings',
    },
    ...MENU_ITEMS,
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket} />,
        title: 'Log out',
        to: '/logout',
        separate: true,
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

    const handleMenuChange = (menuItem) => {
        console.log(menuItem)
    }

    const currentUser = true

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
                    {currentUser ? (
                        <>
                            <Tippy content="Message" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <MessageIcon />
                                </button>
                            </Tippy>
                            <Tippy content="Inbox" placement="bottom">
                                <button className={cx('action-btn')}>
                                    <InboxIcon />
                                </button>
                            </Tippy>
                        </>
                    ) : (
                        <Button primary>Log in</Button>
                    )}
                    <Menu items={currentUser ? userMenu : MENU_ITEMS} onChange={handleMenuChange}>
                        {currentUser ? (
                            <Image
                                className={cx('user-avatar')}
                                // src="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/b602bae758034d7cbbd764ab6b7a7a4c~c5_300x300.webp?x-expires=1664636400&x-signature=ovYv0xAOV4zHskJlkuGUmrAImmg%3D"
                                src=""
                                alt="..."
                                // fallback="https://p16-sign-va.tiktokcdn.com/tos-useast2a-avt-0068-giso/d427cb356d6b2d79005fde9f642f3d7a~c5_100x100.jpeg?x-expires=1666753200&x-signature=xiMVLEHxesnjTzn41WD7wYnqCFY%3D"
                            />
                        ) : (
                            <button className={cx('more-button')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        )}
                    </Menu>
                </div>
            </div>
        </header>
    )
}

export default Header
