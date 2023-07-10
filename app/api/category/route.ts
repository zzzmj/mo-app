// const categories = await prisma.category.findMany();
import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
    try {
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
