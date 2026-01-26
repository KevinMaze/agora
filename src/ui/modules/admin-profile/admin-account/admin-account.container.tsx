import { useAuth } from "@/context/AuthUserContext";
import { Typo } from "@/ui/design-system/typography";

export const AdminAccountContainer = () => {
    const { authUser } = useAuth();
    console.log("user", authUser);
    return (
        <div className="flex justify-center pt-20 pb-40">
            <Typo variant="para" components="p">
                Bienvenue dans votre espace personnel.
            </Typo>
        </div>
    );
};
