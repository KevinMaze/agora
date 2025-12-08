import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Twitch from "@/../public/assets/images/twitch.png";
import Youtube from "@/../public/assets/images/youtube.png";

export const LiveGazette = () => {
    return (
        <Container className="mt-20 mb-20">
            <div className="flex lg:flex-row lg:justify-around flex-col items-center">
                <Typo
                    variant="title"
                    components="p"
                    weight="bold"
                    className="mt-3 uppercase text-2xl sm:text-4xl"
                >
                    Twitch
                </Typo>
                <Image src={Twitch} alt="twitch" />
            </div>
            <div className="flex lg:flex-row lg:justify-around flex-col-reverse items-center mt-20">
                <Image src={Youtube} alt="Youtube" className="" />
                <Typo
                    variant="title"
                    components="p"
                    weight="bold"
                    className="mt-3 uppercase text-2xl sm:text-4xl"
                >
                    Youtube
                </Typo>
            </div>
            <div className="border-1 border-primary w-60 sm:w-180 lg:w-250 m-auto"></div>
        </Container>
    );
};
