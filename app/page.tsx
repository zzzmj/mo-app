import Button from '@/components/ui/Button'
import Image from 'next/image'
import Link from 'next/link'
export default function Home() {
    
    return (
        <div className='container max-w-4xl xs:p-8 sm:p-12 layout-content pb-20'>
            <Link href={"/home/index"}>
                <h1 className='text-2xl text-center mt-6 mb-6'>开始准备使用吧！</h1>
                <div className={"flex flex-col items-center justify-center border-2 border-gray-200 rounded-lg p-6"}>
                    <Image className='mb-6' width={100} height={100} src="https://d35aaqx5ub95lt.cloudfront.net/images/owls/3ddd27fd32d1910636ead35ea966b488.svg" alt='123' />
                    <Link className="w-full" href={"/home/index"}><Button type="success">开始使用</Button></Link>
                </div>
            </Link>
        </div>
    )
}
