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

    static async findQuestionById(userId: string, categoryId: string) : Promise<QuestionObj[] | null> {
        try {
            const question = await prisma.question.findMany({
                where: { 
                    userId,
                    categoryId
                },
                select: {
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
//   static async findUserByUsername(username: string) : Promise<PrismaUser | null> {
//     try {
//       const user = await prisma.user.findFirst({
//         where: { username },
//       })
//       return user
//     } catch (error) {
//       return null
//     }
//   }
}

export default Question
