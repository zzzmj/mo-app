'use client'

import { useSession } from "next-auth/react";

const useUserId = () => {
    const session = useSession();

    return (session?.data?.user as any)?.id
}

export default useUserId