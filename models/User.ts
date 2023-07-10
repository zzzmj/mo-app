import { PrismaClient, User as PrismaUser } from "@prisma/client";

const prisma = new PrismaClient();

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
    return prisma.user.findFirst({
      where: { id },
      select: {
        username: true,
        createdAt: true,
        updatedAt: true
      }
    });
  }
  static async findUserByUsername(username: string) : Promise<PrismaUser | null> {
    return prisma.user.findFirst({
      where: { username },
    });
  }
}

export default User
