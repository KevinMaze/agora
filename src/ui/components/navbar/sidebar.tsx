import React, { useState } from "react";
import { Navbar } from "./navbar";
import { TfiMenu, TfiClose } from "react-icons/tfi";
import clsx from "clsx";

const Sidebar: React.FC = () => {
    // L'état pour contrôler la visibilité du menu
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => setSidebarOpen((prev) => !prev);

    return (
        <div>
            {/* Le bouton pour ouvrir/fermer le menu */}
            <button
                type="button"
                onClick={toggleSidebar}
                className={clsx(
                    "fixed top-4 right-4 z-[60] p-2 rounded-md text-primary bg-background/50 backdrop-blur-sm transition-transform duration-300 ease-in-out",
                    isSidebarOpen && "translate-x-[-300px]",
                )}
                aria-label="Toggle sidebar"
            >
                {isSidebarOpen ? <TfiClose size={24} /> : <TfiMenu size={24} />}
            </button>

            {/* Le composant Sidebar, qui s'affichera quand isSidebarOpen est true */}
            <Navbar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        </div>
    );
};

export default Sidebar;
