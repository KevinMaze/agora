// src/components/Sidebar.tsx
import React from "react";
import clsx from "clsx";
import { Avatar } from "@/ui/design-system/avatar";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { Logo } from "@/ui/design-system/logo";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import { useAuth } from "@/context/AuthUserContext";

interface NavbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ isOpen, onClose }: NavbarProps) => {
    const { authUser, authUserIsLoading } = useAuth();
    console.log(authUser);
    console.log(authUserIsLoading);

    return (
        <>
            <div
                className={clsx(
                    "fixed inset-0 bg-background/50 z-40 transition-opacity",
                    isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                )}
                onClick={onClose}
            />

            <aside
                className={clsx(
                    "fixed top-0 right-0 h-screen w-[300px] bg-background text-primary z-50",
                    "flex flex-col py-8 shadow-[-5px_0_15px_rgba(0,0,0,0.2)]",
                    "transition-transform duration-300 ease-in-out",
                    isOpen ? "translate-x-0" : "translate-x-full shadow-none"
                )}
            >
                <Link
                    href="/"
                    className="px-6 mb-10 flex items-center justify-center"
                >
                    <Logo size="large" />
                </Link>

                <nav className="flex-grow overflow-y-auto">
                    <Typo variant="para" color="primary">
                        <ActiveLink
                            href="/"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            Accueil
                        </ActiveLink>

                        <ActiveLink
                            href="/coffeeShop"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            Coffee Shop
                        </ActiveLink>

                        <ActiveLink
                            href="/bibliotheque"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            La Bibliothèque
                        </ActiveLink>

                        <ActiveLink
                            href="/librairie"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            La Librairie
                        </ActiveLink>

                        <ActiveLink
                            href="/gazette"
                            className="block px-6 py-4 text-lg hover:bg-foreground hover:text-white transition-colors"
                        >
                            La Gazette
                        </ActiveLink>

                        <ActiveLink
                            href="/collect"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            Click and Collect
                        </ActiveLink>

                        <ActiveLink
                            href="/apropos"
                            className="block px-6 py-4 text-lg  hover:bg-foreground hover:text-white transition-colors"
                        >
                            À propos
                        </ActiveLink>
                        {/* <ActiveLink
                            href="/design-system"
                            className="block px-6 py-4 text-lg hover:bg-foreground hover:text-white transition-colors"
                        >
                            Design System
                        </ActiveLink> */}
                    </Typo>
                </nav>

                <div className="px-6 text-center flex-shrink-0">
                    <div className="flex flex-raw items-center space-x-3">
                        <Avatar
                            size="large"
                            alt="avatar"
                            src="/assets/images/legolas.jpg"
                        />
                        <Typo variant="para" className="mt-2">
                            Username
                        </Typo>
                    </div>

                    <Button>Déconnexion</Button>

                    <Button baseUrl="/connexion">Connexion</Button>
                </div>
            </aside>
        </>
    );
};

// épisode 24/
