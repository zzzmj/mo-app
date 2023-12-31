import { PrismaClient, User as PrismaUser } from "@prisma/client";
import prisma from "@/lib/prisma";

interface UserCreateInput {
  username: string;
  password: string;
}

interface MoUser {
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

class User {
    static async create(data: UserCreateInput) : Promise<PrismaUser> {
    // 首先检查用户名是否已经被使用
        const existingUser = await prisma.user.findFirst({
            where: { username: data.username },
        });
  
        if (existingUser) {
            throw new Error('用户名已存在！');
        }
        return prisma.user.create({
            data,
        });
    }

    static async findUserById(id: string | undefined) : Promise<MoUser | null> {
        try {
            const user = await prisma.user.findFirst({
                where: { id },
                select: {
                    username: true,
                    createdAt: true,
                    updatedAt: true
                }
            });
            return user
        } catch (error) {
            return null
        }

    }
    static async findUserByUsername(username: string) : Promise<PrismaUser | null> {
        try {
            const user = await prisma.user.findFirst({
                where: { username },
            })
            return user
        } catch (error) {
            return null
        }

    }
}

export default User
