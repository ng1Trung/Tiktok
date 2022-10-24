import Tippy from '@tippyjs/react/headless'
import classNames from 'classnames/bind'

import styles from './Menu.module.scss'
import { Wrapper as PopperWrapper } from '~/components/Popper'
import MenuItem from './MenuItem'
import MenuHeader from './MenuHeader'
import { useState } from 'react'

const cx = classNames.bind(styles)

const defaultFn = () => {}

const Menu = ({ children, items = [], onChange = defaultFn }) => {
    const [history, setHistory] = useState([{ data: items }])

    const current = history[history.length - 1]

    const renderItems = () => {
        return current.data.map((item, index) => {
            const isParent = !!item.children

            return (
                <MenuItem
                    key={index}
                    data={item}
                    onClick={() => {
                        if (isParent) {
                            setHistory((pre) => [...pre, item.children])
                        } else {
                            onChange(item)
                        }
                    }}
                />
            )
        })
    }

    return (
        <Tippy
            visible
            interactive
            delay={[0, 700]}
            offset={[12, 8]}
            placement="bottom-end"
            render={(attrs) => (
                <div className={cx('menu-list')} {...attrs} tabIndex="-1">
                    <PopperWrapper className={cx('menu-popper')}>
                        {history.length > 1 && (
                            <MenuHeader
                                title="Language"
                                onBack={() => {
                                    setHistory((pre) => pre.slice(0, pre.length - 1))
                                }}
                            />
                        )}
                        {renderItems()}
                    </PopperWrapper>
                </div>
            )}
            onHide={() => setHistory((pre) => pre.slice(0, 1))}
        >
            {children}
        </Tippy>
    )
}

export default Menu
