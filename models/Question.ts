import { PrismaClient, Question as PrismaQuestion } from "@prisma/client";

const prisma = new PrismaClient();

interface QuestionObj {
    content: string;
    answer: string;
    answerChoice: number;
    options: string[];
}

interface MoUser {
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

class Question {
    static async create(userId: string, categoryId: string, questionList: PrismaQuestion[]) : Promise<number> {
    // 创建一个新的 Prisma 事务
        const createQuestions = questionList.map((question: PrismaQuestion) => {
            return prisma.question.create({
                data: {
                    content: question.content,
                    answer: question.answer,
                    answerChoice: question.answerChoice,
                    options: question.options,
                    userId,
                    categoryId,
                }
            });
        });

        // 执行事务
        const result = await prisma.$transaction(createQuestions);
        return result.length
    }

    static async findQuestionListById(userId: string, categoryId: string) : Promise<QuestionObj[] | null> {
        try {
            const question = await prisma.question.findMany({
                where: { 
                    userId,
                    categoryId
                },
                select: {
                    id: true,
                    content: true,
                    answer: true,
                    answerChoice: true,
                    options: true,
                    updatedAt: true
                }
            })
            return question
        } catch (error) {
            return null
        }
    }

    static async findQuestionById(questionId: string) : Promise<QuestionObj | null> {
        try {
            const question = await prisma.question.findFirst({
                where: { id: questionId },
                select: {
                    id: true,
                    content: true,
                    answer: true,
                    answerChoice: true,
                    options: true,
                    updatedAt: true
                }
            })
            return question
        } catch (error) {
            return null
        }
    }

    // 只返回Content
    static async getQuestionList(userId: string, categoryId: string) : Promise<any> {
        try {
            const question = await prisma.question.findMany({
                where: { 
                    userId,
                    categoryId
                },
                select: {
                    id: true,
                    content: true,
                }
            })
            return question
        } catch (error) {
            return null
        }
    }

    static async updateQuestion(id: string, questionData: QuestionObj) {
        try {
            const { content, answer, answerChoice, options } = questionData;
            const question = await prisma.question.update({
                where: {
                    id: id,
                },
                data: {
                    content: content,
                    answer: answer,
                    answerChoice: answerChoice,
                    options: {
                        set: options,
                    },
                },
            })
            console.log('question', question)
            return question
        } catch (error) {
            return null
        }
    }

    static async deleteQuestionByIds(ids: string[]): Promise<number> {
        const result = await prisma.question.deleteMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        
        return result.count;
    }
}

export default Question
