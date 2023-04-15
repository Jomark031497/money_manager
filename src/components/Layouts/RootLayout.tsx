import { ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import { Navbar } from '@/components/Layouts';
import { useSession } from 'next-auth/react';

const font = Figtree({
  preload: true,
  weight: ['400', '600', '800'],
  subsets: ['latin'],
});

interface Props {
  children: ReactNode;
}

export const RootLayout = ({ children }: Props) => {
  const { data: sessionData } = useSession();

  return (
    <>
      {sessionData && <Navbar />}
      <main className={`${font.className}`}>{children}</main>
    </>
  );
};
