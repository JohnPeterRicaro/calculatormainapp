import { ContextProvider } from "@/contextprovider/ContextProvider";
import { Helmet } from "react-helmet";
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
      <ContextProvider>
        <div className={` ${leaguSpartan} font-leagu-spartan text-[32px]`}>
          <Component {...pageProps} />
        </div>
      </ContextProvider>
    </>
  );
}
