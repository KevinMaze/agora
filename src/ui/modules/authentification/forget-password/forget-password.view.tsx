import { Typo } from "@/ui/design-system/typography";
import Link from "next/link";
import Image from "next/image";
import { ForgetPasswordForm } from "./components/forget-password.form";
import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
}

export const ForgetPasswordView = ({ form }: Props) => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex justify-center items-center">
            <div className="absolute inset-0 opacity-50">
                <Image
                    src="/assets/images/04.png"
                    alt="Background"
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                    priority
                />
            </div>

            <div className="relative w-[800px] h-[400px] bg-foreground/80 flex flex-col justify-center items-center border-1 border-primary rounded-2xl">
                <div className="flex items-center justify-around w-full sm:flex-row flex-col">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="text-2xl uppercase underline mb-5 sm:mb-0"
                    >
                        Mot de passe perdu ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        weight="bold"
                        className="hover:text-tier flex items-center gap-1 mb-5 sm:mb-0"
                    >
                        <Link href="/connexion">Connexion</Link>
                    </Typo>
                </div>
                <ForgetPasswordForm form={form} />
            </div>
        </div>
    );
};
