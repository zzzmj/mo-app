'use client';

import {useRouter, useSearchParams} from "next/navigation";
import { useState } from "react";
import {signIn} from "next-auth/react";
import toast from "react-hot-toast";



const Login = () => {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const username = e.target[0].value
        const password = e.target[1].value

        if (!username || !password) {
            window.alert('格式不合法')
            return
        }

        setLoading(true)
        signIn("credentials", {
            username,
            password,
            redirect: false
        }).then(res => {
            const error = res?.error
            if (!error) {
                toast.success("登录成功！")
                const url = searchParams.get('redirect_url')
                setTimeout(() => {
                    router.push(url || '/home/index')
                }, 1000)
            } else {
                toast.error(error)
                if (error === '用户未注册') {
                    router.push('/register')
                }
            }
            setLoading(false)
        }).catch(err => {
            window.alert(err)
            setLoading(false)
        })
    }

    return <div className="container max-w-4xl p-8 mt-4">
        {
            loading && <div className="toast toast-center top-1/3">
            <div className="alert">
                <span className="loading loading-spinner text-info"></span>
                <span>登录中...</span>
            </div>
        </div>
        }
        
        <h1 className="text-3xl text-center">登录</h1>
        <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-6">
                <label className="block mb-1">用户名：</label>
                <input className="input input-bordered w-full" />
            </div>
            <div className="mb-6">
                <label className="block mb-1">密码：</label>
                <input type='password' className="input input-bordered w-full" />
            </div>

            <button type="submit" className='btn w-full border-0 bg-mo-100 border-mo-200 text-mo-300'>登录</button>
        </form>
    </div>
}

export default Login