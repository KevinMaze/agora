import { AuthUserProvider } from "@/context/AuthUserContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Flip, ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <AuthUserProvider>
            <Component {...pageProps} />
            <ToastContainer
                position="top-center"
                autoClose={8000}
                transition={Flip}
            />
        </AuthUserProvider>
    );
}
