import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { db } from '@/lib/supabase/client'
import type { UserRole } from '@/types'

// V1 schema: role values are "Rep" | "Manager" | "Director"
function mapRole(v1Role: string): UserRole {
  if (v1Role === 'Director') return 'ADMIN'
  if (v1Role === 'Manager') return 'MANAGER'
  return 'SELLER'
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // V1 users table: password is plaintext, no password_hash column
        const { data: user, error } = await db
          .from('users')
          .select('id, email, name, role, password, avatar_url')
          .eq('email', credentials.email.toLowerCase())
          .single()

        if (error || !user) return null

        // V1: plaintext password comparison
        const valid = (user as unknown as { password: string }).password === credentials.password
        if (!valid) return null

        const role = mapRole((user as unknown as { role: string }).role)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role,
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: UserRole }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as UserRole
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

export default NextAuth(authOptions)
