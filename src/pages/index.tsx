import { WalletSummary, Wallets } from '@/features/wallets';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import { Transactions } from '@/features/transactions';
import { getServerAuthSession } from '@/server/auth';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerAuthSession(context);

  if (!session) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  return {
    props: { user: session.user },
  };
}

export default function Home({ user }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <Head>
        <title>Home | Momney Manager App</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}`} key="canonical" />
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

      <div className="mx-auto flex max-w-xl flex-col gap-6 p-4">
        <section>
          <Wallets userId={user.id} />
        </section>

        <section>
          <WalletSummary userId={user.id} />
        </section>

        <section>
          <Transactions userId={user.id} />
        </section>
      </div>
    </>
  );
}
