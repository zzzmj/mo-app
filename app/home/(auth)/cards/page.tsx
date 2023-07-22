'use client'
import Link from "next/link";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import React from "react";
import { toast } from "react-hot-toast";

const Cards = () => {
    const { isLoading, data: categoryData, error } = useSWR('/api/category')
    if (error) {
        toast.error(error)
    }
    return (
        <ul>
            <h1 className={"text-center text-2xl mb-8"}>我的牌组</h1>
            {
                isLoading && <Loading text={"加载分类中..."} />
            }
            {
                categoryData && categoryData.map((item: any, index: number) => {
                    return <li key={index} className="text-center text-lg tracking-wide">
                        <Link href={`/home/cardList?category=${item.id}&categoryName=${item.name}`}>
                            <button className={"btn mb-4 w-full bg-white justify-start p-4 !h-auto"}>
                                <div className="text-3xl mr-3">
                                    🥳  
                                </div>
                                <div className="flex content justify-start flex-col items-start font-normal">
                                    <div className="mb-2 text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-500">卡片数{item.questionCount}</div>
                                </div>
                            </button>
                        </Link>
                    </li>
                })
            }
        </ul>
    )
}

export default Cards