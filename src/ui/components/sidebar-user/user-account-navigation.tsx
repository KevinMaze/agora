import { ActiveLink } from "../navbar/active-link";
import { Typo } from "@/ui/design-system/typography";

export const UserAccountNavigation = () => {
    return (
        <div className="flex flex-col gap-7 border-2 border-primary p-8 rounded-lg">
            <div className="flex flex-col gap-3">
                <Typo variant="para">
                    <ActiveLink href="/mon_espace">Mon espace</ActiveLink>
                </Typo>
                <Typo variant="para">
                    <ActiveLink href="/mon-espace">Mes livres</ActiveLink>
                </Typo>
            </div>
        </div>
    );
};
