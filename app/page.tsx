import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
    return (
        <div className='container overflow-scroll 2xl:max-w-6xl sm:max-w-5xl xs:p-0 sm:p-12 layout-content pb-20' style={{ margin: '0 auto'}}>
            <h1 className='text-5xl font-bold text-center mt-6 mb-6'>持续不断记录</h1>
            <h1 style={{ color: '#58cc02'}} className='text-5xl font-bold text-center mt-6 mb-6'>意义自然浮现</h1>
            <div className={"flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg p-6"}>
                <Image className='mb-6' width={100} height={100} src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/3ddd27fd32d1910636ead35ea966b488.svg" alt='123' />
                <Link className="w-full mb-3" href={"/login"}><Button type="success">登录</Button></Link>
                <Link className="w-full" href={"/register"}><Button>注册</Button></Link>
            </div>
        </div>
    )
}
