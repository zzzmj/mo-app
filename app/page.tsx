import Link from 'next/link'
// @ts-ignore
export default function Home() {
    return (
        <div>
            <Link href={"/home/index"}>去首页</Link>
            <Link href={"/home/setting"}>数据录入</Link>

        </div>
    )
}
