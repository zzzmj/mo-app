'use client'
import { People, Upload, Book, Home, Plan } from "@icon-park/react";
import classNames from "classnames";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import { useEffect, useState } from "react";

export default function HomeLayout (props) {
    const pathname = usePathname()
    const [selectKey, setSelectKey] = useState('/home/index')
    const router = useRouter()
    const { children } = props

    console.log('searchParams', pathname)
    useEffect(() => {
        setSelectKey(pathname)
    }, [pathname])
    const options = [
        {
            key: '/home/index',
            label: '复习',
            Icon: Plan,
        },
        {
            key: '/home/cards',
            label: '牌组',
            Icon: Book,
        },
        {
            key: '/home/setting',
            label: '上传',
            Icon: Upload,
        },
        {
            key: '/home/my',
            label: '我的',
            Icon: People,
        },
    ]

    const handleClick = (url) => {
        setSelectKey(url)
        router.push(url)
    }

    return (
        <div className="layout">
            <div className="container max-w-4xl xs:p-8 sm:p-12 layout-content min-h-screen" style={{ paddingBottom: '5rem'}}>
                {children}
            </div>

            <ul className={"fixed flex bottom-0 left-0 w-full h-14 border-t border-gray-200 bg-white"}>
                {options.map((item) => {
                    const { Icon } = item
                    const fill = selectKey === item.key ? '#1899d6' : '#333'
                    return <li style={{
                        color: selectKey === item.key ? '#1899d6' : undefined
                    }} className={"flex-1 flex justify-center items-center font-bold"} key={item.key} onClick={() => handleClick(item.key)}>
                        <Icon theme="outline" size="18" fill={fill} style={{ marginRight: 4 }}/>
                        {item.label}
                    </li>
                })}
            </ul>
        </div>
    )
}