import { ReactNode } from 'react';
import { Figtree } from 'next/font/google';

const font = Figtree({
  preload: true,
  weight: ['400', '600', '800'],
  subsets: ['latin'],
});

interface Props {
  children: ReactNode;
}

export const RootLayout = ({ children }: Props) => {
  return (
    <>
      <main className={`${font.className}`}>{children}</main>
    </>
  );
};
