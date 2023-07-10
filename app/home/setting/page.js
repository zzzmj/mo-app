"use client";
import React, {useEffect, useState} from "react";
import {setQuestionData} from "../../../lib/store";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import {useSession} from "next-auth/react";
import Link from "next/link";
import Button from "../../../components/ui/Button";

function parseQuestions(input) {
    let parts = input.split('\n').filter(e => e);
    let questions = [];

    for (let i = 0; i < parts.length;) {
        if (!parts[i].startsWith('【例')) {
            i++;
            continue;
        }

        let content = parts[i++].replace(/【例\d+】/g, "").trim();
        let options = [];
        while (i < parts.length && !parts[i].startsWith('【解析】')) {
            options.push(parts[i++].trim());
        }
        let answer = parts[i++].replace(/【解析】[A-Za-z]./g, "").trim();
        let answerChoice = parts[i - 1].match(/【解析】([A-Za-z])/)[1];
        questions.push({
            content: content,
            answer: answer,
            options: options,
            answerChoice: answerChoice
        });
    }

    return questions;
}

const Setting = () => {
    const { isLoading, data: categoryData } = useSWR('/api/category')
    const session = useSession()
    const [category, setCategory] = useState('')
    const [textareaValue, setTextareaValue] = useState('')
    const [result, setResult] = useState([])

    useEffect(() => {
        if (categoryData) {
            setCategory(categoryData.data[0].id)
        }
    }, [categoryData])
    const handleChange = (e) => {
        setTextareaValue(e.target.value)
    }

    const handleParse = () => {
        const result = parseQuestions(textareaValue)
        const userId = session?.data?.user?.id

        setResult(result)
        setQuestionData(result)
    }

    const handleSelect = (e) => {
        setCategory(e.target.value)
    }

    if (session.status === 'unauthenticated') {
        return (
            <div>
                <h1 class={"text-center text-2xl mb-8"}>上传习题</h1>
                <div class={"text-center text-lg mb-4"}>您尚未登录，请登录后上传</div>
                <Link href={`/login?redirect_url=${window.location.href}`}><Button type={"success"}>登录</Button></Link>
            </div>
        )
    }

    return <div>
        {
            isLoading && <Loading text={"加载分类中..."} />
        }
        <h1 class={"text-center text-2xl mb-8"}>上传习题</h1>
        <div className="mb-6">
            <label className="block mb-1">选择分类：</label>
            <select onChange={handleSelect} value={category} className="select select-bordered w-full">
                {
                    !isLoading && categoryData?.data?.map((item) => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                    })
                }
            </select>
        </div>
        <div className="mb-6">
            <label className="block mb-1">题目内容：</label>
            <textarea value={textareaValue} onChange={handleChange}
                      className={"textarea textarea-lg bg-slate-100 block w-full"}></textarea>
        </div>
        <button onClick={handleParse}
                className='btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300'>识别
        </button>

        <div className={"mt-4"}>
            {
                result.map((item, index) => {
                    return <div className={"card shadow-xl mb-4"} key={index}>
                        <p>【例题】{item.content}</p>
                        <ul>
                            {item.options.map((item, j) => {
                                return <li key={item}>{String.fromCharCode(65 + j)}.{item}</li>
                            })}
                        </ul>
                        <p>【解析】{item.answer}</p>
                    </div>

                })
            }
        </div>
    </div>
}

export default Setting