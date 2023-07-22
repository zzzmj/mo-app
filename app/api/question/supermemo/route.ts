import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/Question";
import { SuperMemoGrade } from "@/lib/sm2";

export async function GET(req: NextRequest) {
    if (!req.url) {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
    const url = new URL(req.url);
    const questionId = url.searchParams.get("questionId");
    let grade = url.searchParams.get("grade");
    if (questionId === null || grade === null) {
        return NextResponse.json({ status: 400, message: "缺少参数" });
    }
    
    const gradeInt = parseInt(grade);
    if (![0, 1, 2].includes(gradeInt)) {
        return NextResponse.json({ status: 400, message: "无效的 grade" });
    }

    if (questionId) {
        const questionList = await Question.memoQuestion(questionId, gradeInt as SuperMemoGrade);
        return NextResponse.json({
            status: 200,
            message: "success",
            data: questionList,
        });
    } else {
        return NextResponse.json({ status: 500, message: "更新错误" });
    }
}