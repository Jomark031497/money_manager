import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <p className="text-primary">Hello world!</p>
    </>
  );
}
