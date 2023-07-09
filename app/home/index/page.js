import prisma from "../../../lib/prisma";
import Link from "next/link";
async function getUsers() {
    const allUsers = await prisma.user.findMany();
    console.log('user', allUsers)
    return {
        props: {allUsers}
    }
}

const Index = () => {
    const categoryList = [
        {
            key: '1',
            label: '言语理解'
        },
        {
            key: '2',
            label: '判断推理'
        },
    ]
    getUsers()
    return <div className={"container max-w-4xl xs:p-4 sm:p-8"}>
        <ul>
            {
                categoryList.map((item, index) => {
                    return <li key={index} className="text-center text-lg tracking-wide">
                        <Link href={`/exam?category=${item.key}`}><button className={"btn mb-4 w-full"}>{item.label}</button></Link>
                    </li>
                })
            }
        </ul>
    </div>
}

export default Index