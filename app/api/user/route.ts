import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export const GET = async (req: Request) => {
    
    
    const { searchParams } = new URL(req.url)
    // 获取用户数据
    return NextResponse.json({
        success: true,
        message: '获取数据成功',
        data: Object.fromEntries(searchParams)
    })
}

export const POST = async (req: Request) => {
    const res = await req.json()
    console.log('res', res)
    // req.b
    // 注册用户
    const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: '' },
            { phone: '' },
          ],
        },
    });
}


// 修改用户数据
export const PUT = (req: Request) => {
    
}


// 删除用户数据
export const DELETE = () => {

}