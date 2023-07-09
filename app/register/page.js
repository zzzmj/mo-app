'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";

const Register = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const password = e.target[1].value
        if (!username || !password) {
            window.alert('格式不合法')
            return 
        }
        try {
            setLoading(true)
            const res = await fetch("/api/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            });
            
            const data = await res.json()
            if (data.status === 200) {
                window.alert('注册成功！')
                setTimeout(() => {
                    router.push('/home/index')
                }, 1000)
            } else {
                window.alert(data.message)
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
            setError(err);
            console.log(err);
        }
    }

    return <div className="container max-w-4xl p-8 mt-4">
        {
            loading && <div className="toast toast-center top-1/3">
            <div className="alert">
                <span className="loading loading-spinner text-info"></span>
                <span>注册中...</span>
            </div>
        </div>
        }
        
        <h1 className="text-3xl text-center">注册</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block mb-1">用户名：</label>
                <input className="input input-bordered w-full" />
            </div>
            <div className="mb-6">
                <label className="block mb-1">密码：</label>
                <input type='password' className="input input-bordered w-full" />
            </div>

            <button type="submit" className='btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300'>注册</button>
        </form>
    </div>
}

export default Register