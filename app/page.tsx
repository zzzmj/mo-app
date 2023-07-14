import Button from '@/components/ui/Button'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
    return (
        <div className='container max-w-4xl xs:p-8 sm:p-12 layout-content pb-20'>
            <Link href={"/home/index"}>
                <h1 className='text-4xl font-bold text-center mt-6 mb-6'>春风得意马蹄疾</h1>
                <h1 style={{ color: '#58cc02'}} className='text-4xl font-bold text-center mt-6 mb-6'>一日看尽长安花</h1>
                <div className={"flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg p-6"}>
                    <Image className='mb-6' width={100} height={100} src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/3ddd27fd32d1910636ead35ea966b488.svg" alt='123' />
                    <Link className="w-full mb-3" href={"/login"}><Button type="success">登录</Button></Link>
                    
                    <Link className="w-full" href={"/register"}><Button>注册</Button></Link>
                </div>
            </Link>
        </div>
    )
}
