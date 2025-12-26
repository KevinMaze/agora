import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";
import Image from "next/image";
import BookBox from "@/../public/assets/images/book_box.jpg";

export const PresentationCollect = () => {
    return (
        <Container className="mt-25 mb-200">
            <Typo
                variant="title"
                components="h1"
                weight="bold"
                className="mt-3 uppercase text-2xl sm:text-4xl lg:text-6xl underline text-center sm:text-start"
            >
                Les Box Littéraires
            </Typo>
            <div className="lg:relative sm:flex lg:justify-center sm:flex-col lg:items-center">
                <div className="lg:absolute lg:w-[500px] lg:h-[400px] lg:right-150 lg:top-60 mb-5">
                    <Image
                        src={BookBox}
                        alt="Image de la box"
                        className="border-1 border-primary rounded-3xl"
                        objectFit="cover"
                    />
                </div>
                <div className="lg:absolute z-1 bg-foreground/80 p-5 rounded-3xl lg:top-10 lg:w-[800px] lg:left-90 text-center">
                    <Typo
                        variant="para"
                        components="p"
                        weight="normal"
                        className="text-center mt-5 sm:text-xl"
                        color="other"
                    >
                        Elles sont destinées à ceux qui savent se faire plaisir
                        et à ceux qui savent faire plaisir : des box littéraires
                        pour tous les goûts, soigneusement sélectionnés par vos
                        libraires : thriller, fantasy, romance, science-fiction,
                        littérature blanche, etc… disponibles en neuf mais aussi
                        en occasion. Et pour les plus curieux, une box
                        transmédia qui vous fera voyager entre les supports.
                        <br />
                        <br />
                        A l’intérieur plein de petites surprises vous attendent
                        : marque-page originaux, thé en vrac, gourmandises,
                        bougies, créations d’artisans locaux, t-shirt et
                        tote-bag, remises, playlist musicale offerte… qui
                        changeront en fonction des disponibilités et des
                        saisons. Alors n’hésitez plus : anniversaires, fêtes
                        nationales, départs à la retraite, occasions spéciales,
                        nos box littéraires sauront vos séduires !
                        <br />
                        <br />
                    </Typo>
                </div>
            </div>
        </Container>
    );
};
