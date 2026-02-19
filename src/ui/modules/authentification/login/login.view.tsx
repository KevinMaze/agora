import { Typo } from "@/ui/design-system/typography";
import Link from "next/link";
import Image from "next/image";
import { LoginForm } from "./components/login-form";
import { FormsType } from "@/types/form";

interface Props {
    form: FormsType;
}

export const LoginView = ({ form }: Props) => {
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
                <div className="flex sm:flex-row flex-col items-center justify-around w-full">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="text-2xl uppercase underline mb-5 sm:mb-0"
                    >
                        Connexion
                    </Typo>
                    <div className="flex items-center gap-1 mb-5 sm:mb-0">
                        <Typo
                            variant="para"
                            components="p"
                            weight="bold"
                            className=""
                        >
                            Tu n'as pas de compte ?
                        </Typo>
                        <Typo
                            variant="para"
                            components="p"
                            weight="bold"
                            className="hover:text-tier"
                        >
                            <Link href="/connexion/inscription">
                                Inscription
                            </Link>
                        </Typo>
                    </div>
                </div>
                <LoginForm form={form} />
                <Typo
                    variant="para"
                    components="p"
                    className="mt-4 text-center text-[14px]"
                >
                    <Link
                        href="/connexion/mot-de-passe-perdu"
                        className="hover:underline text-secondary"
                    >
                        Mot de passe oublié ?
                    </Link>
                </Typo>
            </div>
        </div>
    );
};
