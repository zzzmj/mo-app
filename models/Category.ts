import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface tinyCategory {
    id: string,
    name: string,
    count?: number
}

class Category {
    static async getTinyCategory(userId: string) {
        try {
            let categorys: tinyCategory[] = await prisma.category.findMany({
                select: {
                    id: true,
                    name: true,
                }
            })
    
            for (let i = 0; i < categorys.length; i++) {
                const item = categorys[i];
                const count = await prisma.question.count({
                    where: { 
                        userId,
                        categoryId: item.id
                    }
                });
                item.count = count;
            }
    
            return categorys
        } catch (error) {
            throw error
        }
        
    }
}

export default Category
