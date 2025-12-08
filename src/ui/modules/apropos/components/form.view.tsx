import { Container } from "@/ui/components/container";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";

export const AproposFormView = () => {
    return (
        <Container className="mt-50 lg:mt-80">
            <div className="flex flex-col lg:flex-row lg:justify-around justify-center items-center gap-20 lg:gap-0">
                <div className="">
                    <form action="" className="flex flex-col gap-5">
                        <label htmlFor="name" className="">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Entrer votre nom"
                                required
                                className="w-100 h-10 border-2 border-primary bg-other rounded-xl"
                            />
                        </label>
                        <label
                            htmlFor="firstname"
                            className="flex justify-center gap-3"
                        >
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Prénom"
                                required
                                color="other"
                                className="w-100 h-10 border-2 border-primary bg-other rounded-xl"
                            />
                        </label>
                        <label
                            htmlFor="email"
                            className="flex justify-center gap-3"
                        >
                            <input
                                type="email"
                                id="email"
                                placeholder="E-mail"
                                required
                                className="w-100 h-10 border-2 border-primary bg-other rounded-xl"
                            />
                        </label>
                        <label
                            htmlFor="message"
                            className="flex justify-center gap-3"
                        >
                            <textarea
                                id="message"
                                placeholder="Votre message"
                                required
                                className="w-100 h-80 border-2 border-primary bg-other rounded-xl resize-none"
                            />
                        </label>
                        <Button variant="primary">Envoyer</Button>
                    </form>
                </div>
                <div className="flex flex-col justify-between items-center gap-25">
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase -rotate-12"
                    >
                        Une demande particulière ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase rotate-12"
                    >
                        une precision ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase -rotate-12"
                    >
                        où alors on papotte ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase rotate-12"
                    >
                        n’hésitez pas à nous écrire
                    </Typo>
                </div>
            </div>
        </Container>
    );
};
