import "@/styles/globals.css";
import Sidebar from "@/ui/components/navbar/sidebar";
import { Footer } from "@/ui/components/footer/footer";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Sidebar />
            <Component {...pageProps} />
            <Footer />
        </>
    );
}
