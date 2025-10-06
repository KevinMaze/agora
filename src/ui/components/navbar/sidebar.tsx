// src/App.tsx
import React, { useState } from "react";
import Navbar from "./navbar";

const Sidebar: React.FC = () => {
    // L'état pour contrôler la visibilité du menu
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    // Un état d'exemple pour simuler la connexion de l'utilisateur
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const openSidebar = () => setSidebarOpen(true);
    const closeSidebar = () => setSidebarOpen(false);

    return (
        <div className="app-container">
            <header className="main-header">
                {/* Le bouton pour ouvrir le menu */}
                <button onClick={openSidebar} className="menu-toggle-button">
                    ☰
                </button>
            </header>

            <main className="main-content">
                {/* Bouton pour tester l'état de connexion */}
                <button onClick={() => setIsAuthenticated(!isAuthenticated)}>
                    {isAuthenticated
                        ? "Simuler Déconnexion"
                        : "Simuler Connexion"}
                </button>
            </main>

            {/* Le composant Sidebar, qui s'affichera quand isSidebarOpen est true */}
            <Navbar
                isOpen={isSidebarOpen}
                onClose={closeSidebar}
                isAuthenticated={isAuthenticated}
            />
        </div>
    );
};

export default Sidebar;
