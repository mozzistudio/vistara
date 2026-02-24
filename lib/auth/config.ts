import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUserByEmail } from '@/lib/airtable/queries/users'

const demoUsers: Record<string, { id: string; name: string; email: string; password: string; role: string; territory: string }> = {
  'carlos.rep@vistara-demo.com': {
    id: 'demo-rep-carlos',
    name: 'Carlos Mendoza',
    email: 'carlos.rep@vistara-demo.com',
    password: 'demo2026',
    role: 'Rep',
    territory: 'Panamá Centro',
  },
  'maria.manager@vistara-demo.com': {
    id: 'demo-manager-maria',
    name: 'Maria Silva',
    email: 'maria.manager@vistara-demo.com',
    password: 'demo2026',
    role: 'Manager',
    territory: 'Panamá Metro',
  },
  'jorge.director@vistara-demo.com': {
    id: 'demo-director-jorge',
    name: 'Jorge Fernández',
    email: 'jorge.director@vistara-demo.com',
    password: 'demo2026',
    role: 'Director',
    territory: 'Nacional',
  },
  'admin@vistara-demo.com': {
    id: 'demo-admin',
    name: 'Admin',
    email: 'admin@vistara-demo.com',
    password: 'demo2026',
    role: 'Admin',
    territory: 'Nacional',
  },
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Try Airtable first
        try {
          const user = await getUserByEmail(credentials.email)
          if (user && user.password === credentials.password) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              territory: user.territory,
            }
          }
        } catch (err) {
          console.error('Airtable auth error:', err instanceof Error ? err.message : err)
        }

        // Fallback to demo users
        const demo = demoUsers[credentials.email]
        if (demo && demo.password === credentials.password) {
          return {
            id: demo.id,
            name: demo.name,
            email: demo.email,
            role: demo.role,
            territory: demo.territory,
          }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.territory = (user as any).territory
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id
        ;(session.user as any).role = token.role
        ;(session.user as any).territory = token.territory
      }
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'vistara-demo-secret-key-change-in-production',
}
