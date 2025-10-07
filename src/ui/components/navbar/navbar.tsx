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
                    "fixed inset-0 bg-background/50 z-40 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            {/* Le contenu du menu latéral */}
            <aside
                className={clsx(
                    "fixed top-0 right-0 h-screen w-[300px] bg-background text-primary z-50",
                    "flex flex-col py-8 shadow-[-5px_0_15px_rgba(0,0,0,0.2)]",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full shadow-none"
                )}
            >
                <div className="px-6 mb-10 flex items-center justify-center">
                    <Logo size="large" />
                </div>

                <nav className="flex-grow overflow-y-auto">
                    <Typo variant="para" color="primary">
                        <a
                            href="/lien1"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 1
                        </a>

                        <a
                            href="/lien2"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 2
                        </a>

                        <a
                            href="/lien3"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 3
                        </a>

                        <a
                            href="/lien4"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 4
                        </a>

                        <a
                            href="/lien5"
                            className="block px-6 py-4 text-lg hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 5
                        </a>

                        <a
                            href="/lien6"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 6
                        </a>

                        <a
                            href="/lien7"
                            className="block px-6 py-4 text-lg  hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 7
                        </a>
                        {/*                         <a
                            href="/lien8"
                            className="block px-6 py-4 text-lg hover:bg-gray-800 hover:text-white transition-colors"
                        >
                            Lien de navigation 8
                        </a> */}
                    </Typo>
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
