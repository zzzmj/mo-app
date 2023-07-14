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
                        <Link href={`/home/cardList?category=${item.id}`}>
                            <button className={"flex btn btn-outline mb-4 w-full justify-between bg-white"}>
                                <span>{item.name}</span>
                                <span>{item.questionCount}题</span>
                            </button>
                        </Link>
                    </li>
                })
            }
        </ul>
    )
}

export default Cards