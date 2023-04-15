import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  return {
    props: { user: session.user },
  };
};

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Money Manager</title>
      </Head>

      <></>
    </>
  );
}
