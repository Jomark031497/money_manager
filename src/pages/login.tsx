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
        <title>Login | Money Manager</title>
      </Head>

      <div className="mx-auto flex h-screen items-center justify-center p-4">
        <div className="mx-auto flex w-full max-w-xs flex-col items-center gap-4 rounded-xl border border-gray-200 p-4">
          <div className="flex flex-col items-center">
            <AiFillGold className="text-4xl" />
            <p className="text-xl">Momney Manager</p>
          </div>

          <div className="flex flex-col gap-2">
            <Button primary onClick={() => signIn('discord', { callbackUrl: '/' })} className="flex items-center">
              <FaDiscord className="mr-2 text-2xl" />
              Login via Discord
            </Button>

            <Button
              primary
              onClick={() => toast.info('This feature is not yet implemented')}
              className="flex items-center"
            >
              <FaGoogle className="mr-2 text-2xl" />
              Login via Google
            </Button>

            <Button onClick={() => toast.info('This feature is not yet implemented')} className="flex items-center">
              <RiTestTubeFill className="mr-2 text-2xl" />
              Try Demo
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <div className="w-full rounded p-4">
  <p className="mb-4 text-center text-4xl font-semibold">momney</p>

  <div className="flex flex-col items-center gap-2 p-4">
    <Button
      className="flex min-w-[160px] items-center py-2"
      primary
      onClick={() => signIn('discord', { callbackUrl: '/' })}
    >
      <FaDiscord className="mr-2 text-2xl" />
      Login via Discord
    </Button>

    <Button
      className="flex min-w-[160px] items-center py-2"
      primary
      onClick={() => signIn('discord', { callbackUrl: '/' })}
    >
      <FaGoogle className="mr-2 text-2xl" />
      Login via Google
    </Button>

    <Button
      className="flex min-w-[160px] items-center py-2"
      primary
      onClick={() => signIn('discord', { callbackUrl: '/' })}
    >
      <BiTestTube className="mr-2 text-2xl" />
      Try Demo
    </Button>
  </div>
</div>; */
}
