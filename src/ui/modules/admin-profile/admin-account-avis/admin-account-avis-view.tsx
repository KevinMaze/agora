import { Typo } from "@/ui/design-system/typography";
import { AdminAccountAvisList } from "./components/admin-account-avis-list";

export const AdminAccountAvisView = () => {
    return (
        <div className="flex flex-col items-center justify-center pt-20 pb-40 gap-5">
            <Typo variant="para" component="p">
                Depuis cet espace, tu peux modérer les avis laissés par les
                utilisateurs.
            </Typo>
            <AdminAccountAvisList />
        </div>
    );
};
