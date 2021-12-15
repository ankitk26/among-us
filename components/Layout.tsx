import useOnlyTitle from "@/hooks/useOnlyTitle";
import Head from "next/head";
import Header from "./Header";
import LeftSideBar from "./LeftSideBar";

interface IProps {
  title: string;
  children: any;
}

export default function Layout({ title, children }: IProps) {
  const onlyTitle = useOnlyTitle();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <Header />
      <main
        className={`grid mx-auto ${
          onlyTitle ? "" : "divide-x"
        } w-[85%] my-8 grid-cols-12 gap-12 mx-auto}`}
      >
        <LeftSideBar />
        <section
          className={`w-full pl-12 ${onlyTitle ? "col-span-6" : "col-span-9"}`}
        >
          {children}
        </section>
      </main>
    </>
  );
}
