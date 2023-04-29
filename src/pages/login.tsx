import Head from 'next/head';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import { RiTestTubeFill } from 'react-icons/ri';
import { GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '@/server/auth';
import { Button } from '@/components/Elements';
import { AiFillGold } from 'react-icons/ai';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

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
        <title>Login | Momney Manager App</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/login`} key="canonical" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Momney - The Ultimate Money Manager App" />
        <meta
          name="description"
          content="Momney is a powerful money manager app that allows you to easily track your expenses, savings, and transactions. With Momney, you can manage your finances, set budgets, and achieve your financial goals with ease. Try Momney today and simplify your financial life."
        />
        <meta
          property="og:description"
          content="Momney is a powerful money manager app that allows you to easily track your expenses, savings, and transactions. With Momney, you can manage your finances, set budgets, and achieve your financial goals with ease. Try Momney today and simplify your financial life."
        />
      </Head>

      <div className="mx-auto flex h-screen items-center justify-center p-4">
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col items-center">
            <AiFillGold className="text-4xl" />
            <p className="text-xl">Momney Manager</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button
              onClick={() => signIn('discord', { callbackUrl: '/' })}
              className="text flex items-center bg-secondary text-white"
            >
              <FaDiscord className="mr-2 text-2xl" />
              Login via Discord
            </Button>

            <Button
              onClick={() => toast.info('This feature is not yet implemented')}
              className="text flex items-center bg-secondary text-white"
            >
              <FaGoogle className="mr-2 text-2xl" />
              Login via Google
            </Button>

            <Button
              onClick={() => toast.info('This feature is not yet implemented')}
              className="text flex items-center bg-secondary text-white"
            >
              <RiTestTubeFill className="mr-2 text-2xl" />
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
