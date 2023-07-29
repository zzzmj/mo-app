'use client'
import fetcher from "@/lib/fetcher"
import { Question } from "@prisma/client";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import useSWR from "swr";

const HomeCardList = (props: any) => {
    const { categoryId } = props

    const session = useSession();
    const userId = (session?.data?.user as any)?.id

    const { isLoading, data: responseData, error, mutate } = useSWR(userId ? `/api/question?userId=${userId}` : null, fetcher)

    console.log('categoryData')
    return <div>

        {responseData?.map((item: Question) => {
            return <div className="bg-white p-4 hover:shadow mb-4 transition-shadow rounded-md" key={item.id}>
                <div className="text-xs text-gray-400 mb-4">{dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')}</div>
                <div className="mb-4">
                    <span className="text-xs tag p-1 rounded bg-blue-100 text-blue-500">#言语理解</span>
                </div>
                <div className="text-[#323232]">{item.content}</div>
                <ul className="text-[#323232]">
                    {(item?.options as any)?.map((item: any, index: number) => {
                        return <li className="pl-4" key={index}>{String.fromCharCode(index + 65)}. {item}</li>
                    })}
                </ul>
                <div className="h-[1px] bg-gray-200 my-2"></div>
                <div className="text-[#323232]">{item.answer}</div>
            </div>
        })}
    </div>
}

export default HomeCardList