'use client'
import React from 'react';
import {signOut, useSession} from "next-auth/react";
import useSWR from "swr";
import Button from "@/components/ui/Button";
import Loading from "@/components/ui/Loading";
import Link from "next/link";
import fetcher from '@/lib/fetcher';

const My = () => {
    const session = useSession()
    const userId = session.data?.user?.id
    const { isLoading, data: userData } = useSWR(userId ? `/api/user?userId=${userId}` : null, fetcher)

    const handleClickSignOut = () => {
        signOut().then(res => {
            console.log('退出成功')
        })
    }
    if (session.status === 'loading' || isLoading) {
        return (
            <Loading text={"加载个人信息..."} />
        )
    }
    if (session.status === 'unauthenticated') {
        return (
            <div>
                <h1 className={"text-center text-2xl mb-8"}>个人中心</h1>
                <div className={"text-center text-lg mb-4"}>您尚未登录，请登录后查看</div>
                <Link href={`/login?redirect_url=${window.location.href}`}><Button type={"success"}>登录</Button></Link>
            </div>
        )
    }

    return (
        <div>
            <h1 className={"text-center text-2xl mb-8"}>个人中心</h1>
            <div className="alert mb-4 justify-start">
                <div>用户名称：{userData?.username}</div>
            </div>
            <div className="alert mb-4 justify-start">
                <div>注册时间：{new Date(userData?.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="alert mb-4 justify-start">
                <div>上传题数：{userData?.count}</div>
            </div>
            <Button onClick={handleClickSignOut} style={{ border: 'none' }} type={"error"}>注销登录</Button>
        </div>
    );
};

export default My;