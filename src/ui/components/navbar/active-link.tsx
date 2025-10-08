"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export const ActiveLink = ({ href, children, className }: Props) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={clsx(className, isActive && "font-bold underline")}
        >
            {children}
        </Link>
    );
};
