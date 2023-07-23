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
import SingleUpload from "@/components/SingleUpload";

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
            setQuestionState(questionData);
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

    const handleChange = (data: Question) => {
        setQuestionState(data);
    }

    const handleSave = async () => {
        setSaveLoading(true)
        const data = {
            id: questionId,
            ...questionState
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
                <SingleUpload defaultValue={questionData} onChange={handleChange} />
            </div>
        }
    </div>
}

export default CardDetail