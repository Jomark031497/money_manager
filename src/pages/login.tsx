import Head from 'next/head';
import { FaDiscord, FaGoogle } from 'react-icons/fa';
import { AiOutlineTwitter } from 'react-icons/ai';
import { RiTestTubeFill } from 'react-icons/ri';
import { GetServerSidePropsContext } from 'next';
import { getServerAuthSession } from '@/server/auth';
import { signIn } from 'next-auth/react';

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

      <div className="mx-auto flex h-screen items-center p-4">
        <div className="relative mx-auto max-w-sm grow gap-4 rounded-xl border border-gray-200 px-8 pb-4 pt-8 shadow-2xl">
          <h1 className="relative mb-6 text-lg font-semibold tracking-tighter">
            <span>money</span>
            <span className="text-primary">trackr</span>
            {/* <sup className="absolute top-0 text-xs font-normal">[beta]</sup> */}
          </h1>

          <h2 className="mb-1 text-xl font-semibold">Sign In</h2>
          <p className="text-sm text-gray-500">to continue to moneytrackr</p>

          <div className="flex flex-col items-center py-4">
            <button
              onClick={() => signIn('discord', { callbackUrl: '/' })}
              className="mb-2 flex w-full items-center gap-4 rounded border border-gray-200 p-2 text-sm text-[#7289DA] transition-all hover:bg-gray-100"
            >
              <FaDiscord className="text-xl" />
              <span>Login via Discord</span>
            </button>

            <button className="mb-2 flex w-full items-center gap-4 rounded border border-gray-200 p-2 text-sm text-[#DB4437] transition-all hover:bg-gray-100">
              <FaGoogle className="text-xl" />
              <span>Login via Google</span>
            </button>

            <button className="mb-2 flex w-full items-center gap-4 rounded border border-gray-200 p-2 text-sm text-[#1DA1F2] transition-all hover:bg-gray-100">
              <AiOutlineTwitter className="text-xl" />
              <span>Login via Twitter</span>
            </button>

            <button className="text-secondary flex w-full items-center gap-4 rounded border border-gray-200 p-2 text-sm transition-all hover:bg-gray-100">
              <RiTestTubeFill className="text-xl" />
              <span>Try Demo Version</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
