'use client'
import {useRouter} from "next/navigation";
import {SWRConfig} from "swr";

const fetcher = url => fetch(url).then(r => r.json());
export default function HomeLayout (props) {
    const router = useRouter()
    const { children } = props
    const options = [
        {
            key: '/home/index',
            label: '首页'
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
        router.push(url)
    }

    return (
        <SWRConfig value={{ fetcher }}>
            <div className="container max-w-4xl xs:p-8 sm:p-12 layout-content pb-20">
                {children}
            </div>

            <ul className={"fixed flex bottom-0 left-0 w-full h-20 border-t border-gray-200 bg-white"}>
                {options.map(item => {
                    return <li className={"flex-1 flex justify-center items-center text-lg font-bold"} key={item.key} onClick={() => handleClick(item.key)}>{item.label}</li>
                })}
            </ul>
        </SWRConfig>
    )
}