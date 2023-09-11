'use client'
import { useSession } from "next-auth/react";

const useUserId = () => {
    const session = useSession();
    const userId = (session?.data?.user as any)?.id

    return userId
}

export default useUserId