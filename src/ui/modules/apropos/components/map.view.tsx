import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { LuMapPin } from "react-icons/lu";

export const MapView = () => {
    return (
        <Container>
            <div className="flex flex-col lg:flex-row justify-between items-center mt-50 mb-50 gap-20 lg:gap-0">
                <div className=" w-full h-full flex flex-col justify-between items-center gap-10">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="uppercase text-2xl sm:text-3xl lg:text-4xl underline flex"
                    >
                        Ou nous trouver!{" "}
                        <LuMapPin className="rotate-12 text-tier" />
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="lg:text-xl text-[14px]"
                    >
                        <Typo
                            variant="para"
                            components="p"
                            className="text-center"
                        >
                            L'Agora
                        </Typo>{" "}
                        <br /> 3 rue Crémieux 30000 Nîmes
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="lg:text-xl text-[14px]"
                    >
                        04-XX-XX-XX-XX-XX
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        className="lg:text-xl text-[14px]"
                    >
                        lagora@example.com
                    </Typo>
                </div>
                <div className=" h-auto w-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5755.627326007375!2d4.358089176654284!3d43.83896144039565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b42d0b9c1d5265%3A0xbaab705976de8b0!2s3%20Rue%20Cr%C3%A9mieux%2C%2030000%20N%C3%AEmes!5e0!3m2!1sfr!2sfr!4v1770635062047!5m2!1sfr!2sfr"
                        width="600"
                        height="450"
                        loading="lazy"
                        className="rounded-2xl"
                    ></iframe>
                </div>
            </div>
        </Container>
    );
};
