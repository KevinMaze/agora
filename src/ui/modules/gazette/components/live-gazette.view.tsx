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
                    width="560"
                    height="315"
                    src="https://player.twitch.tv/?channel=kebinu_&parent=192.168.1.26:3000/gazette"
                    title="Twitch live player"
                    allowFullScreen
                ></iframe>
            </div>
            <div className="flex lg:flex-row lg:justify-around flex-col-reverse items-center mt-20">
                <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/jolaO2Z6xCM?si=9_UstKNX-YpH0uXp"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
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
