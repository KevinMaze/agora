import { Container } from "@/ui/components/container";
import { Button } from "@/ui/design-system/button";
import { Typo } from "@/ui/design-system/typography";

export const AproposFormView = () => {
    return (
        <Container className="mt-150">
            <div className="flex flex-row bg-amber-300 justify-around">
                <div className=" bg-amber-600">
                    <form action="" className="flex flex-col gap-5">
                        <label htmlFor="name" className="bg-other w-50">
                            <input
                                type="text"
                                id="name"
                                placeholder="Nom"
                                required
                                className="bg-other w-50"
                            />
                        </label>
                        <label htmlFor="firstname" className="bg-other">
                            <input
                                type="text"
                                id="firstname"
                                placeholder="Prénom"
                                required
                                className="bg-other"
                            />
                        </label>
                        <label htmlFor="email" className="bg-other">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email"
                                required
                                className="bg-other"
                            />
                        </label>
                        <label htmlFor="message" className="bg-other">
                            <textarea
                                id="message"
                                placeholder="Message"
                                required
                                className="bg-other"
                            />
                        </label>
                        <Button variant="primary">Envoyer</Button>
                    </form>
                </div>
                <div className="bg-amber-400 flex flex-col justify-between">
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase"
                    >
                        Une demande particulière ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase"
                    >
                        une precision ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase"
                    >
                        où alors on papotte ?
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="text-2xl uppercase"
                    >
                        n’hésitez pas à nous écrire
                    </Typo>
                </div>
            </div>
        </Container>
    );
};
