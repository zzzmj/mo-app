import { NextRequest, NextResponse } from "next/server";
import Question from "@/models/Question";

export async function GET(req: NextRequest) {
    if (!req.url) {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
    const url = new URL(req.url);
    const questionId = url.searchParams.get("questionId");
    if (questionId) {
        const questionList = await Question.findQuestionById(questionId);
        return NextResponse.json({
            status: 200,
            message: "success",
            data: questionList,
        });
    } else {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
}
export async function POST(req: NextRequest) {
    if (!req.url) {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
    const { id, content, answer, options, answerChoice } = await req.json();
    const data = {
        content, answer, options, answerChoice
    }
    if (id) {
        const questionList = await Question.updateQuestion(id, data);
        return NextResponse.json({
            status: 200,
            message: "success",
            data: questionList,
        });
    } else {
        return NextResponse.json({ status: 400, message: "无效的url" });
    }
}
