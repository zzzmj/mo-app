'use client'
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState, useRef} from "react";
import {getQuestionData} from "../../lib/store";
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import Button from "../../components/ui/Button";
import "swiper/css";
import classNames from "classnames";

const Exam = () => {
    const searchParams = useSearchParams()
    const [dataList, setDataList] = useState([])
    const category = searchParams.get('category')
    const swiperRef = useRef();
    const [optionIndex, setOptionsIndex] = useState('')
    const [activeIndex, setActiveIndex] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [isCorrect, setIsCorrect] = useState(false)
    const [footerState, setFooterState] = useState('disable') // disable | success | error

    useEffect(() => {
        console.log('category', category)
        const data = getQuestionData()
        if (data) {
            setDataList(data)
        }
    }, [])

    useEffect(() => {
        // const flky = new Flickity('.mo-wrap', {
        //     fullscreen: true,
        // })
        // console.log('flky', flky)
    }, [])

    const handleClick = (index) => {
        setOptionsIndex(index)
        setFooterState('success')
    }

    const handleSlideChange = (slide) => {
        console.log('slide', slide)
        setActiveIndex(slide.activeIndex)
        // nextSlide()
    }

    const handleCheck = () => {
        setFooterState('error')
        nextSlide()
    }

    const nextSlide = () => {
        setOptionsIndex('')
        setFooterState('wait')
        swiperRef.current.slideNext()
    }

    const footerCls = classNames({
        'footer-correct': isCorrect
    })

    return <div className={"mo-wrap grid grid-cols-1 p-6"} style={{
        'grid-template-rows':'min-content 1fr min-content',
        'min-height': '100vh'
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
                                return <li onClick={() => handleClick(j)} className={"flex justify-center items-center"} key={item}>
                                    <Button type={type} className={"mb-2"}>
                                        {item}
                                    </Button>
                                    {/*{String.fromCharCode(65 + j)}.*/}

                                </li>
                            })}
                        </ul>
                        {/*<p>【解析】{item.answer}</p>*/}
                    </SwiperSlide>
                })
            }
        </Swiper>
        <div className={"footer p-t-2" + footerCls}>
            {
                footerState === 'error' && <div className={"absolute left-0 right-0 bottom-0 bg-[#ffdfe0] p-4 pb-24 z-0"}>
                    <p className={"text-[#ea2b2b] text-xl font-bold"}>正确答案：</p>
                    <span className={"text-[#ea2b2b]"}>{dataList[activeIndex]?.answer}</span>
                </div>
            }
            <Button onClick={handleCheck} className={"relative"} type={footerState}>{footerState === 'wait' ? '检查' : '继续'}</Button>
        </div>

    </div>
}

export default Exam