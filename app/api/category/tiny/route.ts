import { NextResponse } from "next/server";
import Category from "@/models/Category";


export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);
        const userId = url.searchParams.get("userId");
        if (userId) {
            const categories = await Category.getTinyCategory(userId)
            console.log('查询结果', categories)
            return NextResponse.json({
                status: 200,
                message: "success",
                data: categories || [],
            });
        } else {
            return NextResponse.json({
                status: 400,
                message: "userId没传",
            });
        }
        
    } catch (err) {
        console.log('错误信息', err)
        return NextResponse.json({
            status: 500,
            message: "error",
            test: err
        });
    }
};
