import { Wallets } from '@/features/wallets';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { Transactions } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Dashboard | Momney</title>
      </Head>

      <div className="mx-auto flex max-w-xl flex-col gap-8 p-4">
        <section>
          <Wallets />
        </section>

        <section>
          <Transactions />
        </section>
      </div>
    </>
  );
}
