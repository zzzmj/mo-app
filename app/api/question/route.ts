import { NextRequest, NextResponse } from "next/server"
import Question from "@/models/Question";

export async function GET (req: NextRequest) {
    if (!req.url) {
        return  NextResponse.json({ status: 400, message: '无效的url'})
        
    }
    const url = new URL(req.url)
    const userId = url.searchParams.get('userId')
    const categoryId = url.searchParams.get('categoryId')
    if (userId && categoryId) {
        const questionList = await Question.findQuestionListById(userId, categoryId)
        return NextResponse.json({
            status: 200,
            message: 'success',
            data: questionList
        })
    } else {
        return NextResponse.json({ status: 400, message: '无效的url'})
    }
}

export async function POST (req: Request) {
    try {
        const { userId, categoryId, questionList } = await req.json()
        // 请你补充完整数据库插入的逻辑， count
        const count = await Question.create(userId, categoryId, questionList)
        if (count === questionList.length) {
            return NextResponse.json({
                status: 200,
                message: 'success',
            })
        } else {
            throw new Error('数据无效')
        }

    } catch (err) {
        throw err
    }
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url)
    const ids = searchParams.get('ids')?.split(',')

    if (ids) {
        await Question.deleteQuestionByIds(ids)
        return NextResponse.json({
            status: 200,
            message: 'success',
        })
    } else {
        return NextResponse.json({
            status: 400,
            message: '缺少参数',
        })
    }
}
