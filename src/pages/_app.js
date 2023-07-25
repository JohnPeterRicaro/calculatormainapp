import { ContextProvider } from "@/contextprovider/ContextProvider";
import Head from "next/head";
import "@/styles/globals.css";
import { League_Spartan } from "next/font/google";

export const leaguSpartan = League_Spartan({
  subsets: ["latin"],
  weight: ["700", "800"],
  variable: ["--font-leagu-spartan"],
});

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <link rel="shortcut icon" href="/favicon.png" />
        <title>Calculator Main App</title>
    </Head>
      <ContextProvider>
        <div className={` ${leaguSpartan} font-leagu-spartan text-[30px] md:text-[32px]`}>
          <Component {...pageProps} />
        </div>
      </ContextProvider>
    </>
  );
}
