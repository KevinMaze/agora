import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import { LuMapPin } from "react-icons/lu";

export const MapView = () => {
    return (
        <Container>
            <div className="flex flex-row justify-between items-center mt-80 mb-50">
                <div className=" w-full h-full flex flex-col justify-between items-center gap-10">
                    <Typo
                        variant="title"
                        components="h1"
                        weight="bold"
                        className="uppercase text-4xl underline flex"
                    >
                        Ou nous trouver!{" "}
                        <LuMapPin className="rotate-12 text-tier" />
                    </Typo>
                    <Typo variant="para" components="p" className="text-xl">
                        L'Agora Adresse 30000 Nîmes
                    </Typo>
                    <Typo variant="para" components="p" className="text-xl">
                        04-XX-XX-XX-XX-XX
                    </Typo>
                    <Typo variant="para" components="p" className="text-xl">
                        lagora@example.com
                    </Typo>
                </div>
                <div className=" h-auto w-auto">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.127560143047!2d4.363648912267439!3d43.83245297097366!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b42d0fa643cf29%3A0x7d2a0202f82097b0!2zTsOubWVz!5e0!3m2!1sfr!2sfr!4v1763290682656!5m2!1sfr!2sfr"
                        width="600"
                        height="350"
                        style={{ border: 1 }}
                        loading="lazy"
                        className="rounded-xl border-1 border-primary"
                    ></iframe>
                </div>
            </div>
        </Container>
    );
};
