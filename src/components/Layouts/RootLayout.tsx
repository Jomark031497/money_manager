import { ReactNode } from 'react';
import { Figtree } from 'next/font/google';
import { Navbar } from '@/components/Layouts';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const font = Figtree({
  preload: true,
  weight: ['400', '600', '800'],
  subsets: ['latin'],
});

export const RootLayout = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter();

  return (
    <>
      {!pathname.includes('/login') && <Navbar />}
      <main className={`${font.className}`}>{children}</main>

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};
