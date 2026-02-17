import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import AvatarTest from "@/../public/assets/images/avatar-test.png";

export const CallToActionSidebar = () => {
    return (
        <div className="relative flex flex-col justify-center gap-5 px-8 py-12 overflow-hidden rounded-lg pb-5 bg-foreground border-2 border-primary">
            <Typo
                variant="para"
                components="p"
                className="text-center underline uppercase"
            >
                Bienvenue dans l'espace personnel
            </Typo>
            <Typo variant="para" components="p" className="text-center">
                Dans cet espace, tu retrouveras toute tes informations. Ainsi
                que celle des autres utilisateurs. C'est un espace de partage,
                de communication et d'entraide. Tout comportement inaproprié
                peut entrainer par les admins une suppression de compte.
            </Typo>
            <Image
                width={183}
                alt="avatar"
                src={AvatarTest}
                className="mx-auto px-auto"
            ></Image>
        </div>
    );
};
