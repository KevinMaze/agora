import { useState } from "react";
import Sidebar from "@/ui/components/navbar/sidebar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <>
            {/* Ce bouton peut être dans un composant Header partagé */}
            <button
                onClick={openSidebar}
                className="fixed top-4 right-4 z-50 menu-toggle-button"
            >
                ☰
            </button>

            <Sidebar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                isAuthenticated={isAuthenticated}
            />
            <Component {...pageProps} />
        </>
    );
}
