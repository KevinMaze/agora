import { Typo } from "@/ui/design-system/typography";
import Coffee from "@/../public/assets/images/coffee.jpg";
import Stairway from "@/../public/assets/images/stairway.jpg";
import Event from "@/../public/assets/images/07571.png";
import { Card } from "./card";

export const EvenementView = () => {
    // Données en dur pour le carrousel.
    // À l'avenir, vous pourrez remplacer ceci par un appel à votre API.
    const events = [
        {
            src: Event,
            alt: "Atelier d'écriture créative",
            title: "Atelier d'écriture",
        },
        { src: Coffee, alt: "Dégustation de café", title: "Dégustation" },
        { src: Stairway, alt: "Rencontre avec un auteur", title: "Rencontre" },
    ];

    return (
        <>
            <div className="mt-80 mb-80 flex flex-col items-center">
                <Typo
                    variant="title"
                    components="h1"
                    weight="bold"
                    className="mb-20 uppercase underline tracking-widest"
                >
                    Evènements
                </Typo>
                <div className="mb-20 py-8">
                    <div className="absolute left-0 flex gap-4">
                        {[...events, ...events].map((event, index) => (
                            <Card
                                image={event.src}
                                key={index}
                                alt={event.title}
                                title={event.title}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};
