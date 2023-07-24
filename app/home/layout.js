'use client'
import { useRouter } from "next/navigation";
import { SWRConfig } from "swr";


// const fetcher = async (url) => {
//     const res = await fetch(url);
//     const json = await res.json();
//     if (!res.ok) throw new Error(json.message);
//     if (json.status !== 200) {
//         throw new Error(json.message);
//     }
//     return json.data;
// };
export default function HomeLayout(props) {
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
        <SWRConfig>
            {children}
        </SWRConfig>
    )
}