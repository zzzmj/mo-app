// 
'use client'
import { useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import useSWR from "swr";
import Dialog from "@/components/ui/Dialog";
import Loading from "@/components/ui/Loading";
import ErrorAlert from "@/components/ui/ErrorAlert";
import "swiper/css";
import { useSession } from "next-auth/react";
import request from "@/lib/request";
import Link from "next/link";

type SelectItem = {
    id: string;
    checked: boolean;
};
const CardList = () => {
    const searchParams = useSearchParams()
    const category = searchParams.get('category')
    const categoryName = searchParams.get('categoryName')
    const session = useSession()
    const userId = (session.data?.user as any)?.id
    const { isLoading, data: responseData, error, mutate } = useSWR(userId ? `/api/question?userId=${userId}&categoryId=${category}` : null)
    const [selectIdList, setSelectIdList] = useState<SelectItem[]>([])
    const checkedLength = useMemo(() => {
        return selectIdList.filter(item => item.checked).length
    }, [selectIdList])

    const [deleteLoading, setDeleteLoading] = useState(false)

    useEffect(() => {
        if (responseData) {
            const list = responseData.map((item: any) => ({ id: item.id, checked: false}))
            setSelectIdList(list)
        }
    }, [responseData])

    if (deleteLoading) {
        return <Loading text={"删除中..."} />
    }

    if (isLoading) {
        return <Loading text={"加载习题中..."} />
    }

    if (error) {
        return <ErrorAlert text={error.message || '出现错误'} />
    }

    const handleCheckd = (item: any) => {
        const newList = selectIdList.map((el: any) => {
            if (el.id === item.id) {
                return {
                    ...el,
                    checked: !el.checked
                }
            }
            return el
        })
        setSelectIdList(newList)
    }

    const handleClick = () => {
        const el = document.querySelector('#my-modal') as HTMLDialogElement
        el.showModal()
    }

    const handleDelete = async () => {
        const deleteIds = selectIdList.filter(item => item.checked).map(item => item.id)
        try {
            setDeleteLoading(true)
            await request('/api/question?ids=' + deleteIds.join(','), 'DELETE')
            await mutate()
        } finally {
            setDeleteLoading(false)
        }
        
    }

    return (
        <div className="p-4">
            <h3 className="text-xl text-center mb-4">{categoryName || '卡组'}</h3>
            <ul className="list-disc mb-10">
                {responseData?.map((item: any, index: number) => {

                    return <li key={index} className="truncate flex items-center justify-center mb-3 pb-1 border-b">
                        <input checked={(selectIdList[index] as any)?.checked} onClick={() => handleCheckd(item)} type="radio" name={"radio" + index} className="radio radio-xs mr-3" />
                        <Link className="truncate flex-1 mg-0" href={`/home/cardDetail?questionId=${item.id}`}>{item.content}</Link>
                    </li>
                })}
            </ul>

            {/* action */}
            <div className="w-full fixed bottom-0 left-0 bg-white p-4 flex items-center justify-between border-t">
                <span>已选中：{checkedLength}题</span>
                <span onClick={handleClick} className={"text-red-500"}>删除</span>
            </div>

            <Dialog id="my-modal" onConfirm={handleDelete} />
        </div>
    )
}

export default CardList