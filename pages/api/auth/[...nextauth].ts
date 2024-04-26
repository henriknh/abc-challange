import clientPromise from '../../../lib/mongodb'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import NextAuth from 'next-auth'
import { Adapter } from 'next-auth/adapters'
import Google from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    // GithubProvider({
    //   clientId: process.env.AUTH_GITHUB_ID,
    //   clientSecret: process.env.AUTH_GITHUB_SECRET,
    // }),
    // ...add more providers here
  ],
  adapter: MongoDBAdapter(clientPromise) as Adapter,
}
export default NextAuth(authOptions)
