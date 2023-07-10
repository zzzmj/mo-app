'use client'
import Link from "next/link";
import useSWR from "swr";
import Loading from "../../../components/ui/Loading";
import React from "react";

const Index = () => {
    const { isLoading, data: categoryData } = useSWR('/api/category')
    const categoryList = categoryData?.data

    return (
        <ul>
            <h1 class={"text-center text-2xl mb-8"}>题目分类</h1>
            {
                isLoading && <Loading text={"加载分类中..."} />
            }
            {
                categoryList && categoryList.map((item, index) => {
                    return <li key={index} className="text-center text-lg tracking-wide">
                        <Link href={`/home/exam?category=${item.id}`}>
                            <button className={"btn mb-4 w-full"}>{item.name}</button>
                        </Link>
                    </li>
                })
            }
        </ul>
    )

}

export default Index