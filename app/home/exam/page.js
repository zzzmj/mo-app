'use client'
import { useSearchParams} from "next/navigation";
import {useEffect, useState, useRef, useMemo} from "react";
import {getQuestionData} from "@/lib/store";
import { Swiper, SwiperSlide } from 'swiper/react';
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";
import "swiper/css";
import { useSession } from "next-auth/react";

const Exam = () => {
    const searchParams = useSearchParams()
    const [dataList, setDataList] = useState([])
    const category = searchParams.get('category')
    const session = useSession()
    const userId = session.data?.user?.id
    const { isLoading, data: responseData, error } = useSWR(userId ? `/api/question?userId=${userId}&categoryId=${category}` : null)
    
    const swiperRef = useRef();
    const [optionIndex, setOptionsIndex] = useState('') // 选中的选项
    const [activeIndex, setActiveIndex] = useState(0) // 当前是第几题
    const [footerState, setFooterState] = useState('disable') // disable | success | error | continue
    const selectQuestion = useMemo(() => {
        if (dataList) return dataList[activeIndex]
        else return {}
    }, [dataList, activeIndex])

    useEffect(() => {
        if (responseData) {
            setDataList(responseData)
        }
    }, [responseData])


    const handleClickOption = (index) => {
        if (footerState !== 'disable') {
            return
        }
        setOptionsIndex(index)
        const choice = selectQuestion?.answerChoice
        if (choice === index) {
            setFooterState('success')
        } else {
            setFooterState('error')
        }
    }

    const handleSlideChange = (slide) => {
        setActiveIndex(slide.activeIndex)
        // nextSlide()
    }

    const handleCheck = () => {
        if (footerState === 'success' || footerState === 'error' ) {
            nextSlide()
        } else {
            const choice = selectQuestion?.answerChoice
            console.log('choice', choice, optionIndex)
            if (choice === optionIndex) {
                setFooterState('success')
            } else {
                setFooterState('error')
            }
        }
    }

    const nextSlide = () => {
        setOptionsIndex('')
        setFooterState('disable')
        swiperRef.current.slideNext()
    }

    if (isLoading) {
        return <Loading text={"加载习题中..."} />
    }

    if (error) {
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    return <div className={"mo-wrap grid grid-cols-1 p-6"} style={{
        gridTemplateRows:'min-content 1fr min-content',
        minHeight: '100vh'
    }}>
        {dataList.length > 0 && <progress className="transition-all progress progress-success w-full h-3" value={`${(activeIndex / dataList.length) * 100}`} max="100"></progress>}
        <Swiper simulateTouch={false} allowTouchMove={false} onSwiper={(swiper) => {
            swiperRef.current = swiper;
        }} onSlideChange={handleSlideChange} className={"mo-wrap carousel mt-4 w-full h-full"}>
            {
                dataList.map((item, index) => {
                    return <SwiperSlide className={"text-lg mb-4"} key={index}>
                        <p className={"mb-6"}>{item.content}</p>
                        <ul>
                            {item.options.map((item, j) => {
                                const type = j === optionIndex ? 'primary' : ''
                                return <li onClick={() => handleClickOption(j)} className={"flex justify-center items-center"} key={item}>
                                    <Button type={type} className={"mb-2"}>
                                        {item}
                                    </Button>
                                </li>
                            })}
                        </ul>
                        {/*<p>【解析】{item.answer}</p>*/}
                    </SwiperSlide>
                })
            }
        </Swiper>
        <div className={"footer p-t-2"}>
            {
                footerState === 'error' && <div className={"absolute left-0 right-0 bottom-0 bg-[#ffdfe0] p-4 pb-24 z-0"}>
                    <p className={"text-[#ea2b2b] text-xl font-bold"}>正确答案：</p>
                    <span className={"text-[#ea2b2b]"}>{selectQuestion?.answer}</span>
                </div>
            }
            {
                footerState === 'success' && <div className={"absolute left-0 right-0 bottom-0 bg-[#d7ffb8] p-4 pb-24 z-0"}>
                    <p className={"text-[#58a700] text-2xl font-bold"}>不错哦！</p>
                    <span className={"text-[#58a700]"}>{selectQuestion?.answer}</span>
                </div>
            }
            <Button onClick={handleCheck} className={"relative"} type={footerState}>{footerState === 'wait' ? '检查' : '继续'}</Button>
        </div>

    </div>
}

export default Exam