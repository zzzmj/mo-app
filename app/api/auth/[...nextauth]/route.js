import NextAuth from "next-auth"
import User from '@/models/User'
import bcrypt from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            async authorize(credentials, req) {
                console.log('登录呢？？')
                const inputUsername = credentials.username
                const user = await User.findUser(inputUsername)
                console.log('触发登录', inputUsername, user)
                if (user) {
                    const isCorrect = await bcrypt.compare(credentials.password, user.password)
                    console.log('isCorrect', isCorrect)
                    if (isCorrect) {
                        return user
                    } else {
                        throw new Error('密码错误')
                    }
                } else {
                    throw new Error('用户未注册')
                }
            }
        })
    ],
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id
                token.name = user.username
            }
            return token
        },
        async session ({ session, token }) {
            if (session?.user && token) {
                session.user.id = token.id
                session.user.name = token.username
            }
            console.log('auth session', session)
            return session;
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST };
