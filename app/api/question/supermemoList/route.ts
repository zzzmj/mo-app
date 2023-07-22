import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/Question";
import { SuperMemoGrade } from "@/lib/sm2";

export async function GET(req: NextRequest) {
    if (!req.url) {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const categoryId = url.searchParams.get("categoryId");


    if (userId && categoryId) {
        const questionList = await Question.getReviewedQuestionList(userId, categoryId);
        return NextResponse.json({
            status: 200,
            message: "success",
            data: questionList,
        });
    } else {
        return NextResponse.json({ status: 500, message: "获取列表错误" });
    }
}