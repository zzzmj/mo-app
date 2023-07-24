'use client'
import { useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, useRef, useMemo} from "react";
import { getQuestionData } from "@/lib/store";
import { SuperMemoGrade } from '@/lib/sm2'
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from "swr";
import useSWRImmutable from 'swr/immutable'
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";
import "swiper/css";
import { useSession } from "next-auth/react";
import { Question } from "@prisma/client";
import cn from "@/lib/cn";
import request from "@/lib/request";
import { toast } from "react-hot-toast";

type footerStateType = 'disable' | 'success' | 'error' | 'continue'


const Exam = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [dataList, setDataList] = useState<Question[]>([])
    const category = searchParams.get('category')
    const session = useSession()
    const userId = (session.data?.user as any)?.id
    const { isLoading, data: responseData, error } = useSWRImmutable(userId ? `/api/question/supermemoList?userId=${userId}&categoryId=${category}` : null)
    
    const swiperRef = useRef();
    const [optionIndex, setOptionsIndex] = useState(-1) // 选中的选项
    const [activeIndex, setActiveIndex] = useState(0) // 当前是第几题
    const [footerState, setFooterState] = useState<footerStateType>('disable') // disable | success | error | continue
    const selectQuestion = useMemo(() => dataList[activeIndex], [dataList, activeIndex])

    useEffect(() => {
        if (responseData) {
            setDataList(responseData)
        }
    }, [responseData])


    const handleClickOption = (index: number) => {
        setOptionsIndex(index)
        const choice = selectQuestion?.answerChoice
        if (choice === index) {
            setFooterState('success')
        } else {
            setFooterState('error')
        }
    }

    const handleSlideChange = (slide: any) => {
        // console.log('没有被调用吗？')
        // // setActiveIndex(slide.activeIndex + 1)
        // // nextSlide()
    }

    const handleCheck = async (grade: SuperMemoGrade) => {
        const toastId = toast.loading('记忆中...')
        await request(`/api/question/supermemo`, 'get', {
            userId,
            questionId: selectQuestion.id,
            grade
        }).then(res => {
            toast.remove(toastId)
            if (activeIndex >= dataList.length - 1) {
                router.push('/home/finish')
            } else {
                nextSlide()
            }
            
        }).catch(err => {
            toast.error('记忆失败.')
            console.log('err', err)
        })
    }

    const nextSlide = () => {
        setActiveIndex((index) => index+1)
        setOptionsIndex(-1)
        setFooterState('disable');
        (swiperRef as any)?.current.slideNext()
    }

    if (isLoading) {
        return <Loading text={"加载习题中..."} />
    }

    if (error) {
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    return <div className={"mo-wrap grid grid-cols-1 p-6 fixed h-full overflow-scroll"} style={{
        gridTemplateRows:'min-content 1fr min-content',
    }}>
        {dataList.length > 0 && <progress className="transition-all progress progress-success w-full h-3" value={`${(activeIndex / dataList.length) * 100}`} max="100"></progress>}
        <Swiper 
            simulateTouch={false} 
            allowTouchMove={false} 
            onSwiper={(swiper) => {
                (swiperRef as any).current = swiper;}} 
            onSlideChange={handleSlideChange} className={"mo-wrap carousel mt-4 w-full h-full"}>
            {
                dataList.map((item, index) => {
                    return <SwiperSlide className={"mb-4"} key={index}>
                        <p className={"mb-6"}>{item.content}</p>
                        <ul>
                            {(item as any).options.map((item: string, j: number) => {
                                let type = ''
                                if (j === optionIndex && footerState === 'success') {
                                    type = 'success2'
                                }
                                if (j === optionIndex && footerState === 'error') {
                                    type = 'error2'
                                }
                                
                                return <li onClick={() => handleClickOption(j)} className={"flex justify-center items-center"} key={item}>
                                    <Button type={type} className={cn({
                                        "mb-2 h-auto !p-4 justify-start font-normal border-1": true,
                                        "text-white": j === optionIndex
                                    })}>
                                        {String.fromCharCode(j+65)}. {item}
                                    </Button>
                                </li>
                            })}
                        </ul>
                        {(footerState === 'success' || footerState === 'error') && <div>
                            <div className="divider"></div> 
                            <p className="mb-2">
                                【{footerState === 'success' ? '正确' : '错误'}】
                                <span>正确答案是：{String.fromCharCode(item.answerChoice+65)}，</span>
                                你的答案是：{String.fromCharCode(optionIndex+65)}。
                            </p>
                            <p>【解析】{item.answer}</p>
                        </div>}
                    </SwiperSlide>
                })
            }
        </Swiper>
        <div className={"footer p-t-2"}>
            {(footerState === 'success' || footerState === 'error') && 
            <div className="grid review w-full grid-cols-3" style={{
                // gridTemplateColumns: '1fr 1fr 1fr'
            }}>
                <Button 
                    onClick={() => handleCheck(2)} 
                    className={"bg-green-500 !min-h-0 !h-auto !py-3"} type={"success"}>认识</Button>
                <Button 
                    onClick={() => handleCheck(1)} 
                    className={"bg-amber-500 !min-h-0 !h-auto !py-3"} type={"warning"}>不确定</Button>
                <Button 
                    onClick={() => handleCheck(0)} 
                    className={"bg-red-500 !min-h-0 !h-auto !py-3"} type={"error"}>不认识</Button>
            </div>
            }
            
        </div>

    </div>
}

export default Exam