'use client'
import classNames from "classnames";
import {useRouter} from "next/navigation";
import { useState } from "react";

export default function HomeLayout (props) {
    const [selectKey, setSelectKey] = useState('/home/index')
    const router = useRouter()
    const { children } = props
    const options = [
        {
            key: '/home/index',
            label: '首页'
        },
        {
            key: '/home/cards',
            label: '牌组'
        },
        {
            key: '/home/setting',
            label: '上传'
        },
        {
            key: '/home/my',
            label: '个人'
        },
    ]

    const handleClick = (url) => {
        setSelectKey(url)
        router.push(url)
    }

    return (
        <div className="layout">
            <div className="container max-w-4xl xs:p-8 sm:p-12 layout-content pb-20">
                {children}
            </div>

            <ul className={"fixed flex bottom-0 left-0 w-full h-14 border-t border-gray-200 bg-white"}>
                {options.map((item) => {
                    return <li style={{
                        color: selectKey === item.key ? '#1899d6' : undefined
                    }} className={"flex-1 flex justify-center items-center font-bold"} key={item.key} onClick={() => handleClick(item.key)}>{item.label}</li>
                })}
            </ul>
        </div>
    )
}