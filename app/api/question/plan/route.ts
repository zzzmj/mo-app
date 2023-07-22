// const categories = await prisma.category.findMany();
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
interface CategoryWithQuestionCount {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    questionCount: number;
}

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");
        if (userId) {
            const questionList = await prisma.question.findMany({
                where: { 
                    userId,
                    reviewedAt: {
                        lt: new Date()
                    }
                },
                select: {
                    categoryId: true,
                    category: {
                        select: {
                            name: true
                        }
                    },
                }
            })
            return NextResponse.json({
                status: 200,
                message: "success",
                data: questionList || [],
            });
        } else {
            return NextResponse.json({
                status: 400,
                message: "categoryId和userId没传",
            });
        }
        
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({
            status: 500,
            message: "error",
        });
    }
};
