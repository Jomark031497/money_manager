import { GetServerSideProps, type GetServerSidePropsContext } from 'next';
import { getServerSession, type NextAuthOptions, type DefaultSession } from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/server/db';
import { StaticImageData } from 'next/image';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      image: StaticImageData | string;
    } & DefaultSession['user'];
  }
}

export const authOptions: NextAuthOptions = {
  secret: <string>process.env.SECRET,
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: <string>process.env.DISCORD_CLIENT_ID,
      clientSecret: <string>process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: <string>process.env.GOOGLE_CLIENT_ID,
      clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext['req'];
  res: GetServerSidePropsContext['res'];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
