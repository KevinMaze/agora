import { ActiveLink } from "../navbar/active-link";
import { Typo } from "@/ui/design-system/typography";

export const UserAccountNavigation = () => {
    return (
        <div className="border-2 border-primary rounded-lg bg-foreground overflow-hidden">
            <div className="flex flex-col w-full py-4">
                <Typo variant="para" color="primary">
                    <ActiveLink
                        href="/mon_espace"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Mon espace
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-book"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace des livres
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-box"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace des box
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-recipe"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace des recettes
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-moment"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Recette du moment
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-evenements"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace des événements
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/add-users"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace des membres
                    </ActiveLink>
                    <ActiveLink
                        href="/mon_espace/users"
                        className="block w-full px-4 py-2 hover:bg-background hover:text-white transition-colors"
                    >
                        Espace membres
                    </ActiveLink>
                </Typo>
            </div>
        </div>
    );
};
