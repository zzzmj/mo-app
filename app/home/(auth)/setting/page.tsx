"use client";
import React, { useEffect, useState } from "react";
import { setQuestionData } from "@/lib/store";
import useSWR from "swr";
import Loading from "@/components/ui/Loading";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import request from "@/lib/request";
import { toast } from "react-hot-toast";
import { parseQuestions } from "@/lib/utils";
import cn from "@/lib/cn";
import SingleUpload from "@/components/SingleUpload";
import fetcher from "@/lib/fetcher";

type Question = {
    content: string;
    answer: string;
    answerChoice: number;
    options: any[];
};

const Setting = () => {
    const { isLoading, data: categoryData, error } = useSWR("/api/category", fetcher);
    const session = useSession();
    const [singleValue, setSingleValue] = useState<Question>()
    const [selectType, setSelectType] = useState("single"); // multiple
    const [category, setCategory] = useState("");
    const [textareaValue, setTextareaValue] = useState("");
    const [result, setResult] = useState<Question[]>([]);
    useEffect(() => {
        if (categoryData && categoryData.length > 0) {
            setCategory(categoryData[0].id);
        }
    }, [categoryData]);
    const handleChange = (e: any) => {
        setTextareaValue(e.target.value);
    };

    const handleParse = () => {
        const result: any = parseQuestions(textareaValue);
        setResult(result);
        setQuestionData(result);
    };

    const handleUpload = (singValue?: Question | undefined) => {
        const userId = (session?.data?.user as any)?.id;
        const data = {
            userId,
            questionList: result || [],
            categoryId: category,
        };
        if (singValue) {
            data.questionList = [singValue]
        }
        if (!data.userId || data.questionList.length <= 0 || !data.categoryId) {
            toast.error("未识别到上传数据");
            return;
        }

        const toastId = toast.loading("上传数据中...");
        request("/api/question", "POST", data)
            .then((res) => {
                toast.success("上传成功", { id: toastId });
            })
            .catch((err) => {
                toast.error("上传失败", { id: toastId });
            });
    };

    const handleSelect = (e: any) => {
        setCategory(e.target.value);
    };

    const handleChangeSingle = (value: Question) => {
        // 单题
        setSingleValue(value)
    }

    if (session.status === "unauthenticated") {
        return (
            <div>
                <h1 className={"text-center text-2xl mb-8"}>上传习题</h1>
                <div className={"text-center text-lg mb-4"}>
                    您尚未登录，请登录后上传
                </div>
                <Link href={`/login?redirect_url=${window.location.href}`}>
                    <Button type={"success"}>登录</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            {isLoading && <Loading text={"加载分类中..."} />}
            <div className="tab tabs-boxed w-full p-2 h-auto mb-5">
                <button
                    onClick={() => setSelectType("single")}
                    className={cn("flex-1 rounded-md", {
                        "tab-active": selectType === "single",
                        "!bg-mo-300": selectType === "single",
                        "!text-white": selectType === "single",
                    })}
                >
                    上传
                </button>
                <button
                    onClick={() => setSelectType("multiple")}
                    className={cn("flex-1 rounded-md", {
                        "tab-active": selectType === "multiple",
                        "!bg-mo-300": selectType === "multiple",
                        "!text-white": selectType === "multiple",
                    })}
                >
                    批量上传
                </button>
            </div>
            <div className="mb-6">
                <label className="block mb-1">选择分类：</label>
                <select
                    onChange={handleSelect}
                    value={category}
                    className="select select-bordered w-full"
                >
                    {!isLoading &&
                                categoryData?.map((item: any) => {
                                    return (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                    );
                                })}
                </select>
            </div>
                
            {selectType === "single" && <div>

                <SingleUpload onChange={handleChangeSingle} />

                <button
                    onClick={() => handleUpload(singleValue)}
                    className="btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300"
                >
                    上传
                </button>
            </div>
            }
            {selectType === "multiple" && (
                <>
                    <div className="mb-6">
                        <label className="block mb-1">题目内容：</label>
                        <textarea
                            value={textareaValue}
                            onChange={handleChange}
                            className={"textarea textarea-lg bg-slate-100 block w-full"}
                        ></textarea>
                    </div>
                    <Button onClick={handleParse}>识别</Button>

                    <div className={"mt-4"}>
                        {result.map((item, index) => {
                            return (
                                <div
                                    className={"alert p-4 mb-4 justify-items-start"}
                                    key={index}
                                >
                                    <p className={"text-left"}>【例题】{item.content}</p>
                                    <ul>
                                        {item.options.map((item, j) => {
                                            return (
                                                <li key={item}>
                                                    {String.fromCharCode(65 + j)}.{item}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <p className={"text-left"}>【解析】{item.answer}</p>
                                </div>
                            );
                        })}
                    </div>
                    {result.length > 0 && (
                        <button
                            onClick={() => handleUpload()}
                            className="btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300"
                        >
                            上传
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default Setting;
