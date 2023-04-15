import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';

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
  const { data: sessionData } = useSession();

  console.log(sessionData);

  return (
    <>
      <p className="bg-red-500 text-primary hover:bg-red-200">Hello world!</p>
    </>
  );
}
