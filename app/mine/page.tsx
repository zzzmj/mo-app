'use client'

import cn from "@/lib/cn"
import { AllApplication, ApplicationEffect, Magic, MagicWand } from "@icon-park/react"
import ContributionCalendar from "./_components/ContributionCalendar"
import CardList from "../home/cardList/page"
import HomeCardList from "./_components/HomeCardList"
import SlateEditor from "@/components/editor/SlateEditor"
import useSWR from "swr"
import { useSession } from "next-auth/react"
import useUserId from "@/hooks/useUserId"
import fetcher from "@/lib/fetcher"
import TagList from "./_components/TagList"
import { useState } from "react"

const Mine = () => {

    const [categoryId, setCategoryId] = useState('')

    const userData = [
        {
            key: 'card',
            label: 'MEMO',
            value: 7,
        },
        {
            key: 'category',
            label: 'TAG',
            value: 7,
        },
        {
            key: 'time',
            label: 'DAY',
            value: 7,
        },
    ]

    const handleSelectTag = (id: string) => {
        setCategoryId(id)
    }

    return <div className="w-1/2 flex m-auto pt-4">
        <div className="w-[16rem] mr-6">
            <div className="px-4">
                <div className={"font-bold text-xl mb-4"}>zzzmj</div>
                <div className="flex justify-between">
                    {
                        userData.map(item => {
                            return <div key={item.key} className={"flex justify-start items-start flex-col"}>
                                <span className="text-xl font-bold text-gray-500">{item.value}</span>
                                <span className="text-gray-400">{item.label}</span>
                            </div>
                        })
                    }
                </div>
                <div className="my-4 mb-6">
                    <ContributionCalendar />
                </div>
            </div>
            
            <ul className="mb-6">
                <li
                    className={'flex items-center px-4 rounded-md h-10 leading-10 cursor-pointer hover:bg-gray-100 transition'}>
                    <AllApplication className="mr-2" theme="filled" size="18" fill={"#9d9d9d"} />
                    卡组
                </li>
                <li
                    className={'flex items-center px-4 rounded-md h-10 leading-10 cursor-pointer hover:bg-gray-100 transition'}>
                    <ApplicationEffect className="mr-2" theme="filled" size="18" fill={"#9d9d9d"} />
                    每日回顾
                </li>
            </ul>
            <p className="px-4 mb-4">全部标签</p>
            <TagList onSelectTag={handleSelectTag} />
        </div>
        <div className="flex-1">
            <div className="header flex justify-between">
                <span>MEMO</span>
                <div><input className="bg-[#efefef]" /></div>
            </div>
            {/* 富文本组件输入区。 */}
            <div className="mb-4">
                <SlateEditor />
            </div>

            <div className="memo-list">
                <HomeCardList categoryId={categoryId} />
            </div>
        </div>
    </div>
}

export default Mine