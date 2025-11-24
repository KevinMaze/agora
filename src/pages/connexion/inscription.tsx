import { LayoutBack } from "@/ui/components/layout/layout-back";
import Seo from "@/ui/components/seo";
import { RegisterContainer } from "@/ui/modules/authentification/register/register.container";

export default function Register() {
    return (
        <>
            <Seo
                title="L'Agora - Inscription - espace personnel"
                description="Bienvenue sur Agora, le coffee shop littéraire, inscrivez-vous à votre espace personnel."
            />

            <LayoutBack>
                <RegisterContainer />
            </LayoutBack>
        </>
    );
}
