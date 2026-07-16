import { Typo } from "@/ui/design-system/typography";
import { AddUsersList } from "./components/add-users-list";

export const AddUsersAdminAccountView = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Ici vous pouvez ajouter / gérer les utilisateurs.
            </Typo>
            <AddUsersList />
        </div>
    );
};
