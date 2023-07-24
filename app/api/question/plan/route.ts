import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

interface tinyCategory {
    id: string,
    name: string,
    count?: number
}

export const GET = async (req: Request) => {
    if (!req.url) {
        return  NextResponse.json({ status: 400, message: '无效的url'})
    }

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
                        categoryId: item.id,
                        reviewedAt: {
                            lt: new Date()
                        }
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
                message: "categoryId和userId没传",
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
