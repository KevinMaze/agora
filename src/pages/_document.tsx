import Navbar from "@/ui/components/navbar/navbar";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="fr">
            <Head />
            <Navbar isOpen={false} onClose={() => {}} isAuthenticated={false} />
            <body className="bg-background">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
