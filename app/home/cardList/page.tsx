// 
'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useRef, useMemo } from "react";
import { getQuestionData } from "@/lib/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";
import "swiper/css";
import { useSession } from "next-auth/react";

const CardList = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const session = useSession()
    const userId = (session.data?.user as any)?.id
    const { isLoading, data: responseData, error } = useSWR(userId ? `/api/question?userId=${userId}&categoryId=${category}` : null)

    if (isLoading) {
        return <Loading text={"加载习题中..."} />
    }

    if (error) {
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    return (
        <div className="p-6">
            <ul className="list-disc">
                {responseData?.map((item: any, index: number) => {

                    return <li style={{ color: '#1F2937CC'}} key={index} className="truncate flex items-center justify-center mb-3">
                        <input type="radio" name={"radio" + index} className="radio radio-xs mr-3" />
                        <span className="truncate flex-1 mg-0">{item.content}</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default CardList