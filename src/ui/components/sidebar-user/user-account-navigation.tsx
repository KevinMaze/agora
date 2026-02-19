import { useAuth } from "@/context/AuthUserContext";
import { canAccessRole, getUserRole, UserRole } from "@/lib/roles";
import { ADMIN, REGISTERED } from "@/lib/session-status";
import { Typo } from "@/ui/design-system/typography";
import { ActiveLink } from "../navbar/active-link";

type AccountNavItem = {
    href: string;
    label: string;
    allowedRoles: UserRole[];
};

export const UserAccountNavigation = () => {
    const { authUser } = useAuth();
    const userRole = getUserRole(authUser);

    const navItems: AccountNavItem[] = [
        {
            href: "/mon_espace",
            label: "Mon espace",
            allowedRoles: [REGISTERED, ADMIN],
        },
        {
            href: "/mon_espace/add-book",
            label: "Espace des livres",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-box",
            label: "Espace des box",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-recipe",
            label: "Espace des recettes",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-moment",
            label: "Recette du moment",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-evenements",
            label: "Espace des événements",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-users",
            label: "Espace des membres",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/add-concert",
            label: "Espace des concerts",
            allowedRoles: [ADMIN],
        },
        {
            href: "/mon_espace/users",
            label: "Espace membres",
            allowedRoles: [REGISTERED],
        },
    ];

    const visibleNavItems = navItems.filter((item) =>
        canAccessRole(userRole, item.allowedRoles),
    );

    return (
        <div className="border-2 border-primary rounded-lg bg-foreground overflow-hidden">
            <div className="flex flex-col w-full py-4">
                <Typo variant="para" color="primary">
                    {visibleNavItems.map((item) => (
                        <ActiveLink
                            key={item.href}
                            href={item.href}
                            className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                        >
                            {item.label}
                        </ActiveLink>
                    ))}
                </Typo>
            </div>
        </div>
    );
};
