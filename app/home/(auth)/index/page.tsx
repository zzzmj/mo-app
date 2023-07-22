'use client'
import Link from "next/link";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import useUserId from "@/lib/hooks/useUserId";
import ErrorAlert from "@/components/ui/ErrorAlert";

const Index = () => {
    const userId = useUserId()
    // const { isLoading, data: categoryData, error } = useSWR('/api/category')
    const { isLoading, data: planData, error } = useSWR(userId ? `/api/question/plan?userId=${userId}` : '')
    if (error) {
        toast.error(error.message)
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    // console.log('plan', planData)
    const newPlan = planData?.reduce((pre: any, cur: any) => {
        if (pre[cur.categoryId]) {
            pre[cur.categoryId].count += 1;
        } else {
            pre[cur.categoryId] = {
                count: 1,
                name: cur.category.name,
                id: cur.categoryId
            };
        }
        return pre;
    }, {});

    
    return (
        <ul>
            <h1 className={"text-center text-2xl mb-8"}>Just Do It!</h1>
            {
                isLoading && <Loading text={"加载复习计划中..."} />
            }
            {
                planData && planData.length <= 0 ? <div>
                    <div className="box bg-white p-6 shadow-sm rounded-lg">
                        <h1 className="text-center text-3xl mb-10">太棒啦</h1>
                        <p className="text-center text-2xl mb-10">🍭 今天学习完成啦 🍭</p>
                    </div>
                </div> :
                    <div className="mb-2">今日学习</div>
            }
            {
                newPlan && Object.keys(newPlan).map((key, index) => {
                    const item = newPlan[key]
                    return (
                        <Link key={item.id} href={`/home/exam?category=${item.id}`}>
                            <button className={"btn mb-4 w-full bg-white justify-start p-4 !h-auto"}>
                                <div className="text-3xl mr-3">
                                    🥳
                                </div>
                                <div className="flex content justify-start flex-col items-start font-normal">
                                    <div className="mb-2 text-sm">{item.name}</div>
                                    <div className="text-xs text-gray-500">复习数{item.count}</div>
                                </div>
                            </button>
                        </Link>
                    )
                })
            }
        </ul>
    )

}

export default Index