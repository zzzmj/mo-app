"use client";

import {useRouter} from "next/navigation";

const Index = () => {
    const router = useRouter()
    const categoryList = [
        {
            key: '1',
            label: '言语理解'
        },
        {
            key: '2',
            label: '判断推理'
        },
    ]

    const handleClick = (key) => {
        router.push(`/exam?category=${key}`)
    }

    return <div className={"container max-w-4xl xs:p-4 sm:p-8"}>
        <ul>
            {
                categoryList.map((item, index) => {
                    return <li key={index} className="text-center text-lg tracking-wide" onClick={() => handleClick(item.key)}>
                        <button className={"btn mb-4 w-full"}>{item.label}</button>
                    </li>
                })
            }
        </ul>
    </div>
}

export default Index