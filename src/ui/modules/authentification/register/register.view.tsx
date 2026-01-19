import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "./components/register.form";
import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
}

export const RegisterView = ({ form }: Props) => {
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
                <div className="flex items-center justify-around w-full">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="text-2xl uppercase underline"
                    >
                        Inscription
                    </Typo>
                    <div className="flex items-center gap-1">
                        <Typo
                            variant="para"
                            components="p"
                            weight="bold"
                            className=""
                        >
                            Déjà un compte ?
                        </Typo>
                        <Typo
                            variant="para"
                            components="p"
                            weight="bold"
                            className="hover:text-tier"
                        >
                            <Link href="/connexion">Connexion</Link>
                        </Typo>
                    </div>
                </div>
                <RegisterForm form={form} />
                <Typo
                    variant="para"
                    components="p"
                    className="mt-4 text-center px-8 text-[14px]"
                >
                    En vous inscrivant, vous acceptez nos{" "}
                    <Link href="#" className=" text-secondary hover:underline">
                        Conditions d'utilisation
                    </Link>{" "}
                    et notre{" "}
                    <Link href="#" className=" text-secondary hover:underline">
                        Politique de confidentialité
                    </Link>
                    .
                </Typo>
            </div>
        </div>
    );
};
