// 单题上传组件

'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import AutoResizeTextarea from "@/components/ui/AutoResizeTextarea";
import ErrorAlert from "@/components/ui/ErrorAlert";
import request from "@/lib/request";
import { toast } from "react-hot-toast";

interface TabProps {
    tabKey: string;
    activeKey: string;
    onClick: (key: string) => void;
    label: string;
}

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

    useEffect(() => {
        onChange && onChange(questionState)
    }, [questionState])


    const handleCheck = (selectIndex: number) => {
        const updatedOptions = questionState.options.map((item, index) => ({
            ...item,
            checked: index === selectIndex,
        }));
        setQuestionState({
            ...questionState,
            options: updatedOptions,
        });
    }

    const handleAddOptions = () => {
        setQuestionState((prevState) => {
            const updatedOptions = prevState.options.concat({value: '', checked: false})
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

    return <div className={className}>
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
                                    <input onChange={() => handleCheck(index)} checked={item.checked} type="checkbox" className="checkbox mr-2" />

                                    <AutoResizeTextarea  value={item.value} onChange={(e) => handleChangeOption(index, e.target.value)} />
                                    {/* <div
                                        contentEditable={true} 
                                        style={{ whiteSpace: 'pre-wrap' }}
                                        className={"w-20 mo-form-item textarea bg-slate-100 flex-1"}
                                        dangerouslySetInnerHTML={{__html: item.value}}
                                    /> */}
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
            </div>
        }
    </div>
}

export default SingleUpload