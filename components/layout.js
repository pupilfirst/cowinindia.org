import Meta from "../components/meta";
import Header from "../components/header";
import Footer from "../components/footer";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  console.log(router.asPath);
  return (
    <>
      <Meta />
      <div className="min-h-full flex flex-col items-stretch">
        <Header />
        <main className="flex-grow bg-gray-50 py-10">
          <div className="max-w-4xl py-3 bg-gray-50 mx-auto"></div>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
