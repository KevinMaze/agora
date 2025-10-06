// src/components/Sidebar.tsx
import React from "react";
import clsx from "clsx";
import { Avatar } from "@/ui/design-system/avatar";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { Logo } from "@/ui/design-system/logo";

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
                <div className="px-6 mb-10 flex items-center justify-center">
                    {/* Vous pouvez remplacer ce texte par votre composant Logo */}
                    <Logo size="large" />
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
                    <div className="flex flex-raw items-center space-x-3">
                        <Avatar
                            size="large"
                            alt="avatar"
                            src="/assets/images/ai-generated-8058844_1920.jpg"
                        />
                        <Typo variant="para" className="mt-2">
                            Username
                        </Typo>
                    </div>
                    {isAuthenticated ? (
                        <Button>Déconnexion</Button>
                    ) : (
                        <Button>Connexion / Inscription</Button>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Navbar;
