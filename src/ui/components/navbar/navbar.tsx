// src/components/Sidebar.tsx
import React from "react";
import clsx from "clsx";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { Logo } from "@/ui/design-system/logo";
import Link from "next/link";
import { ActiveLink } from "./active-link";
import { useAuth } from "@/context/AuthUserContext";
import { AccountAvatarNavigationLink } from "./account-avatar-link";

interface NavbarProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Navbar = ({ isOpen, onClose }: NavbarProps) => {
    const { authUser } = useAuth();
    const authentificationSystem = (
        <div className="px-6 text-center flex-shrink-0">
            <Button baseUrl="/connexion">Connexion</Button>
            <Button baseUrl="/connexion/inscription">Inscription</Button>
        </div>
    );

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-background/50 z-40 transition-opacity opacity-100"
                    onClick={onClose}
                />
            )}

            <aside
                className={clsx(
                    "fixed top-0 right-0 h-screen w-[300px] bg-background text-primary z-50",
                    "flex flex-col py-8 shadow-[-5px_0_15px_rgba(0,0,0,0.2)]",
                    "transition-transform duration-300 ease-in-out",
                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full shadow-none pointer-events-none",
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

                {!authUser ? (
                    authentificationSystem
                ) : (
                    <AccountAvatarNavigationLink />
                )}
            </aside>
        </>
    );
};
