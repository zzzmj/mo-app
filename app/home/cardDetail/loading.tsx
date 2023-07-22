'use client'
import Spin from "@/components/ui/Spin"


const Loading = () => {
    return <div className="fixed inset-0 bg-slate-50">
        <Spin />
    </div>
}

export default Loading