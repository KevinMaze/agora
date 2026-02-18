import { Typo } from "@/ui/design-system/typography";
import { UsersList } from "./components/users-list";

export const UsersAdminAccountView = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Bienvenue dans votre espace personnel. Ici vous pouvez ajouter
                voir les utilisateurs.
            </Typo>
            <UsersList />
        </div>
    );
};
