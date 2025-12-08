import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Paint from "@/../public/assets/images/paint.jpg";
import Pot from "@/../public/assets/images/pot.jpg";
import WomanPainting from "@/../public/assets/images/woman-painting.jpg";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const EvenementGazette = () => {
    return (
        <div className="m-10">
            <div className="p-3 bg-foreground h-full rounded-lg shadow-lg lg:max-w-8xl flex flex-col justify-center items-center xl:flex-row xl:justify-around">
                <div className="">
                    <Typo
                        variant="para"
                        components="h1"
                        size="extrabold"
                        className="uppercase sm:text-3xl lg:text-4xl underline text-center sm:text-start"
                    >
                        En ce moment
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        size="normal"
                        color="secondary"
                        className="text-center sm:text-start sm:text-xl lg:text-2xl mt-5 uppercase"
                    >
                        Date
                    </Typo>
                    <div className="w-full mt-5">
                        <Image
                            src={WomanPainting}
                            alt="woman paint"
                            className="rounded-2xl"
                        />
                        <div className="flex flex-row justify-around mt-5">
                            <FaFacebook className="lg:text-2xl text-primary" />
                            <FaXTwitter className="lg:text-2xl text-primary" />
                            <FaInstagram className="lg:text-2xl text-primary" />
                            <FaYoutube className="lg:text-2xl text-primary" />
                            <FaTiktok className="lg:text-2xl text-primary" />
                        </div>
                    </div>
                    <div className="mt-10 w-full">
                        <Typo
                            variant="para"
                            components="p"
                            color="other"
                            className="text-justify text-[14px] sm:text-xl"
                        >
                            Quam quidem partem accusationis admiratus sum et
                            moleste tuli potissimum esse Atratino datam. Neque
                            enim decebat neque aetas illa postulabat neque, id
                            quod animadvertere poteratis, pudor patiebatur
                            optimi adulescentis in tali illum oratione versari.
                            Vellem aliquis ex vobis robustioribus hunc male
                            dicendi locum suscepisset; aliquanto liberius et
                            fortius et magis more nostro refutaremus istam male
                            dicendi licentiam. Tecum, Atratine, agam lenius,
                            quod et pudor tuus moderatur orationi meae et meum
                            erga te parentemque tuum beneficium tueri debeo.
                        </Typo>
                    </div>
                </div>

                <div className="p-5 h-full flex-1 mt-10">
                    <Typo
                        variant="para"
                        components="h1"
                        size="extrabold"
                        className="uppercase sm:text-3xl lg:text-4xl underline text-center"
                    >
                        Prochainement
                    </Typo>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-40 sm:w-full">
                                <Image
                                    src={Paint}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between ml-2 sm:ml-5">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-[14px] sm:text-xl text-primary" />
                                <FaXTwitter className="text-[14px] sm:text-xl text-primary" />
                                <FaInstagram className="text-[14px] sm:text-xl text-primary" />
                                <FaYoutube className="text-[14px] sm:text-xl text-primary" />
                                <FaTiktok className="text-[14px] sm:text-xl text-primary" />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-40 sm:w-full">
                                <Image
                                    src={Pot}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between ml-2 sm:ml-5">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-[14px] sm:text-xl text-primary" />
                                <FaXTwitter className="text-[14px] sm:text-xl text-primary" />
                                <FaInstagram className="text-[14px] sm:text-xl text-primary" />
                                <FaYoutube className="text-[14px] sm:text-xl text-primary" />
                                <FaTiktok className="text-[14px] sm:text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-40 sm:w-full">
                                <Image
                                    src={Paint}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between  ml-2 sm:ml-5">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-[14px] sm:text-xl text-primary" />
                                <FaXTwitter className="text-[14px] sm:text-xl text-primary" />
                                <FaInstagram className="text-[14px] sm:text-xl text-primary" />
                                <FaYoutube className="text-[14px] sm:text-xl text-primary" />
                                <FaTiktok className="text-[14px] sm:text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-40 sm:w-full">
                                <Image
                                    src={Pot}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between ml-2 sm:ml-5">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-[14px] sm:text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-[14px] sm:text-xl text-primary" />
                                <FaXTwitter className="text-[14px] sm:text-xl text-primary" />
                                <FaInstagram className="text-[14px] sm:text-xl text-primary" />
                                <FaYoutube className="text-[14px] sm:text-xl text-primary" />
                                <FaTiktok className="text-[14px] sm:text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="border-1 border-primary w-60 sm:w-180 lg:w-250 m-auto mt-10"></div>
        </div>
    );
};
