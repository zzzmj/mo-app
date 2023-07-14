import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"
import User from "@/models/User";

export const GET = async (req: Request) => {
    try {
        const { searchParams } = new URL(req.url)
        const userId = searchParams.get('userId')
        if (userId) {
            const user = await User.findUserById(userId)
            const count = await prisma.question.count()
            return NextResponse.json({
                status: 200,
                message: 'success',
                data: {
                    ...user,
                    count
                }
            })
        } else {
            return NextResponse.json({
                status: 500,
                message: 'fail',
                data: null
            })
        }
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'fail',
            data: error
        })
    }
}

export const POST = async (req: Request) => {
    const res = await req.json()
    // req.b
    // 注册用户
    const user = await prisma.user.findFirst({
        where: {
            OR: [
                { username: '' },
            ],
        },
    });
}

//
// // 修改用户数据
// export const PUT = (req) => {
//
// }
//
//
// // 删除用户数据
// export const DELETE = () => {
//
// }