import NextAuth from "next-auth"
import KakaoProvider from "next-auth/providers/kakao";
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, '----------------callback jwt token');
      console.log(user, '----------------callback jwt user');
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
  },
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_CLIENT_ID,
      clientSecret: process.env.AUTH_KAKAO_CLIENT_SECRET!
    })
  ],
})