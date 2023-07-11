import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import Question from "@/models/Question";

export async function GET (req: Request) {
    try {
        const { userId, questionData } = await req.json()
        console.log('userId', userId, questionData)
        const categories = await prisma.category.findMany();
        return NextResponse.json({
            status: 200,
            message: 'success',
            data: categories
        })
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: 'error',
        })
    }
}

export async function POST (req: Request) {
    try {
        const { userId, categoryId, questionList } = await req.json()
        // 请你补充完整数据库插入的逻辑， count
        
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
