// 学习完成

import Button from "@/components/ui/Button"
import Link from "next/link"

const Finish = () => {

    return <div className="p-6 min-h-screen">

        <div className="box bg-white p-6 shadow-sm rounded-lg">
            <h1 className="text-center text-3xl mb-10">太棒啦</h1>
            <p className="text-center text-2xl mb-10">🎉 今天学习完成啦 🎉</p>

            <Link href="/home/index"><Button type="success">回到首页</Button></Link>
        </div>
        
    </div>
}

export default Finish