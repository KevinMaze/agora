// src/components/Sidebar.tsx
import React from "react";
import clsx from "clsx";

// Définition des props que le composant attend
interface NavbarProps {
    isOpen: boolean;
    onClose: () => void;
    isAuthenticated: boolean; // Pour savoir si l'utilisateur est connecté
}

const Navbar: React.FC<NavbarProps> = ({
    isOpen,
    onClose,
    isAuthenticated,
}) => {
    return (
        <>
            {/* Fond semi-transparent qui couvre la page, cliquable pour fermer */}
            <div
                className={clsx(
                    "fixed inset-0 bg-black/50 z-40 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Le contenu du menu latéral */}
            <aside
                className={clsx(
                    "fixed top-0 right-0 h-screen w-[300px] bg-gray-900 text-white z-50",
                    "flex flex-col py-8 shadow-[-5px_0_15px_rgba(0,0,0,0.2)]",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full"
                )}
            >
                <div className="px-6 text-center flex-shrink-0">
                    {/* Vous pouvez remplacer ce texte par votre composant Logo */}
                    <div className="text-3xl font-bold mb-8">MonLogo</div>
                </div>

                <nav className="flex-grow overflow-y-auto">
                    <ul>
                        <li>
                            <a
                                href="/lien1"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 1
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien2"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 2
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien3"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 3
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien4"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 4
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien5"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 5
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien6"
                                className="block px-6 py_4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 6
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien7"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 7
                            </a>
                        </li>
                        <li>
                            <a
                                href="/lien8"
                                className="block px-6 py-4 text-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                            >
                                Lien de navigation 8
                            </a>
                        </li>
                    </ul>
                </nav>

                <div className="px-6 text-center flex-shrink-0">
                    {isAuthenticated ? (
                        <button className="w-full px-4 py-3 mt-4 text-base font-bold text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                            Déconnexion
                        </button>
                    ) : (
                        <button className="w-full px-4 py-3 mt-4 text-base font-bold text-white bg-blue-600 rounded-md cursor-pointer hover:bg-blue-700 transition-colors">
                            Connexion / Inscription
                        </button>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Navbar;
