import { NextResponse } from 'next/server'

export async function GET() {
    const res = await fetch('https://api.mokahr.com/api-platform/v1/jobs-groupedby-zhineng/mihoyo?mode=social&siteId=42280', {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
    })
    const data = await res.json()

    return NextResponse.json(data)
}