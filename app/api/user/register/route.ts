import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export const POST = async (req: Request) => {
    try {
        const { username, password } = await req.json()
        const hashedPassword = await bcrypt.hash(password, 5)
        await User.create({
            username,
            password: hashedPassword
        })
        return NextResponse.json({
            status: 200,
            message: '创建成功!'
        })
    } catch (error: any) {
        return NextResponse.json({
            status: 500,
            message: error.message
        })
    }
    
}
