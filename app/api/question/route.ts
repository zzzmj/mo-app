// const session = await getServerSession(req, res, authOptions)


import { NextResponse } from "next/server"
import prisma from "@/lib/prisma";
import {getServerSession} from "next-auth";
// import {authOptions} from "../auth/[...nextauth]/route";

export async function GET () {
    // const session = await getServerSession(req, res, authOptions)
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
