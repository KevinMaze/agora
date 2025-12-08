import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Drum from "@/../public/assets/images/drums.jpg";
import Monkey from "@/../public/assets/images/monkey.jpg";
import Legolas from "@/../public/assets/images/legolas.jpg";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const SoonGazette = () => {
    return (
        <Container className="mb-40">
            <Typo
                variant="para"
                components="h2"
                weight="bold"
                className="mb-20 mt-20 uppercase text-4xl sm:text-6xl sm:text-end text-center"
            >
                Prochainement
            </Typo>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-15 justify-items-center">
                <div>
                    <Typo
                        variant="para"
                        components="p"
                        weight="bold"
                        color="secondary"
                        className="text-xl uppercase"
                    >
                        date
                    </Typo>
                    <div className="mt-10 relative">
                        <Typo
                            variant="para"
                            components="p"
                            className="absolute pl-5 uppercase mt-5 z-1"
                        >
                            Name
                        </Typo>
                        <div className="w-80 h-80 relative overflow-hidden rounded-2xl">
                            <Image
                                src={Monkey}
                                alt="Monkey"
                                fill
                                className="opacity-30 object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-around mt-5">
                        <FaFacebook className="text-xl text-primary" />
                        <FaXTwitter className="text-xl text-primary" />
                        <FaInstagram className="text-xl text-primary" />
                        <FaYoutube className="text-xl text-primary" />
                        <FaTiktok className="text-xl text-primary" />
                    </div>
                </div>
                <div>
                    <Typo
                        variant="para"
                        components="p"
                        weight="bold"
                        color="secondary"
                        className="text-xl uppercase"
                    >
                        date
                    </Typo>
                    <div className="mt-10 relative">
                        <Typo
                            variant="para"
                            components="p"
                            className="absolute pl-5 uppercase mt-5 z-1"
                        >
                            Name
                        </Typo>
                        <div className="w-80 h-80 relative overflow-hidden rounded-2xl">
                            <Image
                                src={Drum}
                                alt="Monkey"
                                fill
                                className="opacity-30 object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-around mt-5">
                        <FaFacebook className="text-xl text-primary" />
                        <FaXTwitter className="text-xl text-primary" />
                        <FaInstagram className="text-xl text-primary" />
                        <FaYoutube className="text-xl text-primary" />
                        <FaTiktok className="text-xl text-primary" />
                    </div>
                </div>
                <div>
                    <Typo
                        variant="para"
                        components="p"
                        weight="bold"
                        color="secondary"
                        className="text-xl uppercase"
                    >
                        date
                    </Typo>
                    <div className="mt-10 relative">
                        <Typo
                            variant="para"
                            components="p"
                            className="absolute pl-5 uppercase mt-5 z-1"
                        >
                            Name
                        </Typo>
                        <div className="w-80 h-80 relative overflow-hidden rounded-2xl">
                            <Image
                                src={Legolas}
                                alt="Monkey"
                                fill
                                className="opacity-30 object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-row justify-around mt-5">
                        <FaFacebook className="text-xl text-primary" />
                        <FaXTwitter className="text-xl text-primary" />
                        <FaInstagram className="text-xl text-primary" />
                        <FaYoutube className="text-xl text-primary" />
                        <FaTiktok className="text-xl text-primary" />
                    </div>
                </div>
            </div>
        </Container>
    );
};
