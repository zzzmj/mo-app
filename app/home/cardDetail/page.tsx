'use client'
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";
import { useSession } from "next-auth/react";
import request from "@/lib/request";
import classNames from "classnames";
import { toast } from "react-hot-toast";

interface TabProps {
    tabKey: string;
    activeKey: string;
    onClick: (key: string) => void;
    label: string;
}

type Question = {
    content: string,
    answer: string,
    answerChoice: number,
    options: any[],
}
  
const Tab: React.FC<TabProps> = ({ tabKey, activeKey, onClick, label }) => {
    const isActive = tabKey === activeKey;
    const tabClassName = isActive ? "tab tab-active bg-cyan-400" : "tab";
    // const style = isActive ?
  
    return (
        <a className={tabClassName} onClick={() => onClick(tabKey)}>
            {label}
        </a>
    );
};
  
  

const CardDetail = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const questionId = searchParams.get('questionId')
    const { isLoading, data: questionData, error, mutate } = useSWR(`/api/question/detail?questionId=${questionId}`)
    const [tabKey, setTabKey] = useState('edit')
    const [saveLoading, setSaveLoading] = useState(false)

    const [questionState, setQuestionState] = useState<Question>({
        content: '',
        answer: '',
        answerChoice: 0,
        options: [], // {checked}
    })

    useEffect(() => {
        if (questionData) {
            const { content, answer, answerChoice, options } = questionData;
            const updatedOptions = options.map((item: any, index: number) => ({
                value: item,
                checked: index === answerChoice,
            }));
        
            setQuestionState({
                content: content,
                answer: answer,
                answerChoice: answerChoice,
                options: updatedOptions,
            });
        }
    }, [questionData])

    if (isLoading) {
        return <Loading text={"加载习题中..."} />
    }

    if (saveLoading) {
        return <Loading text={"保存中..."} />
    }

    if (error) {
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    const handleCheck = (selectIndex: number) => {
        setQuestionState((prevState) => {
            const updatedOptions = prevState.options.map((item, index) => ({
                ...item,
                checked: index === selectIndex,
            }));
        
            return {
                ...prevState,
                options: updatedOptions,
            };
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

    const handleSave = async () => {
        const content = document.querySelector('#mo-form-content')?.innerHTML
        const answer = document.querySelector('#mo-form-answer')?.innerHTML
        const options = Array.from(document.querySelectorAll('.mo-form-item')).map(item => item.innerHTML)
        const answerChoice = questionState.options.findIndex(item => item.checked)

        setSaveLoading(true)
        const data = {
            id: questionId,
            content,
            answer,
            options,
            answerChoice,
        }
        try {
            await request('/api/question/detail', 'POST', data)
            await mutate()
            toast.success('保存成功！')
        } catch (error) {
            toast.success('保存失败！')
        } finally {
            setSaveLoading(false)
        }
        

        console.log('更新值', content, answer, options, answerChoice)
    }

    return <div className="pt-2 pl-4 pr-4">
        <div className="flex items-center justify-between pb-2 border-b">
            <span onClick={() => router.back()}>返回</span>
            <button className='btn border-0 bg-mo-100 border-mo-200 text-mo-300'>编辑</button>
            {/* <div className="tabs tabs-boxed">
            </div> */}
            <span onClick={handleSave}>保存</span>
        </div>
        {
            tabKey === 'edit' && <div className="mt-4">
                <div className="item mb-4">
                    <label className="block mb-1">内容：</label>
                    <div
                        id="mo-form-content"
                        contentEditable={true} 
                        className={"textarea bg-slate-100 block w-full"}>
                        {questionState.content}
                    </div>
                </div>
                <div className="item mb-4">
                    <label className="block mb-1">选项：</label>
                    <ul>
                        {
                            questionState?.options?.map((item, index) => {
                                return <li className="flex  mb-4 items-center" key={index}>
                                    <input onClick={() => handleCheck(index)} checked={item.checked} type="checkbox" className="checkbox mr-2" />
                                    <div
                                        contentEditable={true} 
                                        style={{ whiteSpace: 'pre-wrap' }}
                                        className={"w-20 mo-form-item textarea bg-slate-100 flex-1"}>
                                        {item.value}
                                    </div>
                                    <div className="w-15 pl-2">
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
                    <div
                        id="mo-form-answer"
                        contentEditable={true} 
                        className={"textarea bg-slate-100 block w-full"}>
                        {questionState.answer}
                    </div>
                </div>
            </div>
        }
    </div>
}

export default CardDetail