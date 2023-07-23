import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
// interface CategoryWithQuestionCount {
//     id: string;
//     name: string;
//     questionCount?: number;
// }

export const GET = async (req: Request) => {
    try {
        const categories = await prisma.category.findMany({
            select: {
                id: true,
                name: true,
            }
        });
        // const categoriesWithQuestionCount: CategoryWithQuestionCount[] =
        //     await Promise.all(
        //         categories.map(async (category) => {
        //             const questionCount = await prisma.question.count({
        //                 where: { categoryId: category.id },
        //             });
        //             return { ...category, questionCount };
        //         })
        //     );
        return NextResponse.json({
            status: 200,
            message: "success",
            data: categories,
        });
    } catch (err) {
        console.log('err', err)
        return NextResponse.json({
            status: 500,
            message: "error",
        });
    }
};
