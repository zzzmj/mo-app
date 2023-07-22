import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export interface tinyCategory {
    id: string,
    name: string,
    count?: number
}

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");
        if (userId) {
            let categorys: tinyCategory[] = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                }
            })
            const countPromises = categorys.map(item =>
                prisma.question.count({
                    where: { 
                        userId,
                        categoryId: item.id
                    }
                }).then(count => ({...item, count}))
            )

            categorys = await Promise.all(countPromises);
            return NextResponse.json({
                status: 200,
                message: "success",
                data: categorys || [],
            });
        } else {
            return NextResponse.json({
                status: 400,
                message: "userId没传",
            });
        }
        
    } catch (err) {
        return NextResponse.json({
            status: 500,
            message: "error",
            test: err
        });
    }
};
