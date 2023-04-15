import { signIn } from 'next-auth/react';
import Head from 'next/head';
import { FaDiscord } from 'react-icons/fa';
import { BiTestTube } from 'react-icons/bi';
import { GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '@/server/auth';

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getServerAuthSession(ctx);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Money Manager</title>
      </Head>

      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col gap-2 rounded-lg bg-white p-4 shadow">
          <button
            onClick={() =>
              signIn('discord', {
                callbackUrl: '/',
              })
            }
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-contrast shadow-primary-light transition-all hover:bg-primary-dark"
          >
            <FaDiscord className="text-2xl" />
            Login via Discord
          </button>
          <button className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-primary-contrast shadow-primary-light transition-all hover:bg-primary-dark">
            <BiTestTube className="text-2xl" />
            Try Demo Version
          </button>
        </div>
      </div>
    </>
  );
}
