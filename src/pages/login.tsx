import Head from 'next/head';

export default function Login() {
  return (
    <>
      <Head>
        <title>Login | Money Manager</title>
      </Head>

      <>
        <form className="p-4">
          <input placeholder="Username" className="px-2 py-1" />
        </form>
      </>
    </>
  );
}
