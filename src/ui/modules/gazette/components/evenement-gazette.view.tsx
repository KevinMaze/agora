import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import Paint from "@/../public/assets/images/paint.jpg";
import Pot from "@/../public/assets/images/pot.jpg";
import WomanPainting from "@/../public/assets/images/woman-painting.jpg";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const EvenementGazette = () => {
    return (
        <div className="mb-20 mt-20 m-10 h-250">
            <div className="rounded-2xl w-full h-full bg-foreground/80 flex flex-row justify-around">
                <div className="p-5 w-full h-full">
                    <Typo
                        variant="para"
                        components="h1"
                        size="extrabold"
                        className="uppercase text-4xl underline"
                    >
                        En ce moment
                    </Typo>
                    <Typo
                        variant="para"
                        components="p"
                        size="normal"
                        color="secondary"
                        className="text-2xl mt-5 uppercase"
                    >
                        Date
                    </Typo>
                    <div className="w-200 mt-5">
                        <Image
                            src={WomanPainting}
                            alt="woman paint"
                            className="rounded-2xl"
                        />
                        <div className="flex flex-row justify-around mt-5">
                            <FaFacebook className="text-2xl text-primary" />
                            <FaXTwitter className="text-2xl text-primary" />
                            <FaInstagram className="text-2xl text-primary" />
                            <FaYoutube className="text-2xl text-primary" />
                            <FaTiktok className="text-2xl text-primary" />
                        </div>
                    </div>
                    <div className="mt-10 w-200">
                        <Typo variant="para" components="p" color="other">
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

                <div className="p-5 w-1/2 h-full">
                    <Typo
                        variant="para"
                        components="h1"
                        size="extrabold"
                        className="uppercase text-4xl underline text-center"
                    >
                        Prochainement
                    </Typo>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-60">
                                <Image
                                    src={Paint}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 justify-between ml-10">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-xl text-primary" />
                                <FaXTwitter className="text-xl text-primary" />
                                <FaInstagram className="text-xl text-primary" />
                                <FaYoutube className="text-xl text-primary" />
                                <FaTiktok className="text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-60">
                                <Image
                                    src={Pot}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 justify-between ml-10">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-xl text-primary" />
                                <FaXTwitter className="text-xl text-primary" />
                                <FaInstagram className="text-xl text-primary" />
                                <FaYoutube className="text-xl text-primary" />
                                <FaTiktok className="text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-60">
                                <Image
                                    src={Paint}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 justify-between ml-10">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-xl text-primary" />
                                <FaXTwitter className="text-xl text-primary" />
                                <FaInstagram className="text-xl text-primary" />
                                <FaYoutube className="text-xl text-primary" />
                                <FaTiktok className="text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-center mt-15">
                        <div>
                            <div className="w-60">
                                <Image
                                    src={Pot}
                                    alt="paint"
                                    className="rounded-2xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col w-1/2 justify-between ml-10">
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                className="uppercase text-2xl"
                            >
                                Titre
                            </Typo>
                            <Typo
                                variant="para"
                                components="h1"
                                size="extrabold"
                                color="secondary"
                                className="uppercase text-2xl"
                            >
                                Date
                            </Typo>
                            <div className="flex flex-row justify-around">
                                <FaFacebook className="text-xl text-primary" />
                                <FaXTwitter className="text-xl text-primary" />
                                <FaInstagram className="text-xl text-primary" />
                                <FaYoutube className="text-xl text-primary" />
                                <FaTiktok className="text-xl text-primary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
