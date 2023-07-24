'use client'
 
import { useChat, useCompletion } from 'ai/react'
import { useEffect, useState, useMemo } from "react";
import Button from "@/components/ui/Button";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
import request from "@/lib/request";
import { toast } from "react-hot-toast";
import Loading from './ui/Loading';

export type Question = {
    content: string,
    answer: string,
    answerChoice: number,
    options: any[],
}

interface SingUploadProps {
    defaultValue?: Question; // The "?" indicates that this prop is optional
    onChange?: (question: Question) => void,
    className?: string
}


const SingleUpload = (props: SingUploadProps) => {
    const { defaultValue, onChange, className } = props
    const [questionState, setQuestionState] = useState<Question>(defaultValue || {
        content: '',
        answer: '',
        answerChoice: 0,
        options: [], // {checked}
    })

    const { messages, append, setInput, input, handleInputChange, handleSubmit } = useChat({
        api: '/api/chat'
    })


    useEffect(() => {
        if (messages && messages.length > 0) {
            const lastMsg = messages[messages.length - 1]
            if (lastMsg && lastMsg.role === 'assistant') {
                setQuestionState((state) => ({
                    ...state,
                    answer: lastMsg.content
                }))
            }
            
            console.log('message', messages)
        }
    }, [messages])
    

    useEffect(() => {
        onChange && onChange(questionState)
    }, [questionState])


    const handleCheck = (index: number) => {
        setQuestionState({
            ...questionState,
            answerChoice: index
        })
    }

    const handleAddOptions = () => {
        setQuestionState((prevState) => {
            const updatedOptions = prevState.options.concat([''])
            return {
                ...prevState,
                options: updatedOptions,
            };
        });
    }

    const handleDeleteOption = (selectIndex: number) => {
        setQuestionState((prevState) => {
            const updatedOptions = prevState.options.filter((item, index) => index !== selectIndex)
            return {
                ...prevState,
                options: updatedOptions,
            };
        });
    }

    const handleChange = (key: string, value: string) => {
        setQuestionState((prevState) => {
            return {
                ...prevState,
                [key]: value
            };
        });
    }

    const handleChangeOption = (index: any, value: any) => {
        const options = questionState.options.map((item, i) => index === i ? value : item)
        setQuestionState({
            ...questionState,
            options
        })
    }

    const handleAi = async () => {
        if (!questionState.content) {
            toast('请输入内容')
            return
        }
        if (!questionState.options || questionState.options.length <= 0 || questionState.options[0].length <= 0) {
            toast('请输入选项')
            return
        }

        const prompt = `${questionState.content}${questionState.options.map((item, index) => {
            return `${String.fromCharCode(index + 65)}${item}`
        })}。 为什么这道题选${String.fromCharCode(questionState.answerChoice + 65)}而不选其他的？你能详细解释一下原因吗？`
        // setInput(prompt)

        // setTimeout(() => {
        //     handleSubmit()
        // }, 0)
        console.log('prompt', prompt)
        // request('/api/chat', 'POST', {
        //     prompt: prompt
        // }).then(res => {
        //     console.log('res', res)
        // }).catch(err => {
        //     console.log('err', err)
        // })
        append({
            content: prompt,
            role: 'user',
        }).then(res => {
            console.log('res', res)
        }).catch(err => {
            console.log('err', err)
        })
    }

    return <div className={className}>
        {/* { isLoading && <Loading text="智能分析中" />} */}
        {
            <div className="mt-4">
                <div className="item mb-4">
                    <label className="block mb-1">内容：</label>
                    <AutoResizeTextarea  value={questionState.content} onChange={(e) => handleChange('content', e.target.value)} />
                </div>
                <div className="item mb-4">
                    <label className="block mb-1">选项：</label>
                    <ul>
                        {
                            questionState?.options?.map((item, index) => {
                                return <li className="flex  mb-4 items-center" key={index}>
                                    <input onChange={() => handleCheck(index)} checked={index === questionState.answerChoice} type="checkbox" className="checkbox mr-2" />
                                    <AutoResizeTextarea value={item} onChange={(e) => handleChangeOption(index, e.target.value)} />
                                    <div className="w-20 pl-2">
                                        <Button onClick={() => handleDeleteOption(index)} type={"error"} className={"px-2 h-8"}>删除</Button>
                                    </div>
                                </li>
                            })
                        }
                        <button onClick={handleAddOptions} className='btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300'>添加一项</button>
                    </ul>
                </div>
                <div className="item mb-4">
                    <label className="block mb-1">解析：</label>
                    <AutoResizeTextarea  value={questionState.answer} onChange={(e) => handleChange('answer', e.target.value)} />
                </div>
                <div className="item mb-4 flex items-center">
                    <Button onClick={handleAi}>智能分析</Button>
                </div>


                {/* <Dialog /> */}
            </div>
        }
    </div>
}

export default SingleUpload