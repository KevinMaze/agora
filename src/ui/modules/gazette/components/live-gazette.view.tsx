import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";

export const LiveGazette = () => {
    return (
        <Container className="mt-20 mb-20">
            <div className="flex lg:flex-row lg:justify-around flex-col items-center">
                <Typo
                    variant="title"
                    component="p"
                    weight="bold"
                    className="mt-3 uppercase text-2xl sm:text-4xl"
                >
                    Twitch
                </Typo>
                <iframe
                    src="https://player.twitch.tv/?channel=kebinu_&parent=192.168.1.26:3000/gazette"
                    title="Twitch live player"
                    allowFullScreen
                    className="sm:w-[560px] sm:h-[315px] "
                ></iframe>
            </div>
            <div className="flex lg:flex-row lg:justify-around flex-col-reverse items-center mt-20">
                <iframe
                    src="https://www.youtube.com/embed/jolaO2Z6xCM?si=9_UstKNX-YpH0uXp"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    className="sm:w-[560px] sm:h-[315px] "
                ></iframe>
                <Typo
                    variant="title"
                    component="p"
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
