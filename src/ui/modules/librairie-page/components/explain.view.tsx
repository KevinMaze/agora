import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";

export const ExplainsView = () => {
    return (
        <>
            <Container className="py-50">
                <Typo
                    variant="para"
                    components="p"
                    className="lg:text-xl text-center "
                    color="secondary"
                >
                    Dans notre démarche de départ, il y avait un voeux immuable
                    : celui de vouloir rassembler, quelques soient les envies de
                    lectures et quelques soient les budgets. C’est pourquoi
                    Jordan a eu cette idée : une boîte à livre à l’intérieur de
                    la librairie. Celle-ci sera le lien subtil entre tous ses
                    adhérents ; prendre un livre dans la boîte à livre est
                    gratuit, mais le système repose sur les conditions suivantes
                    : si on prend un livre, il faut le remplacer par un autre,
                    et surtout, on doit laisser un avis. Ainsi, ces échanges
                    invisibles se feront entre lecteurs et permettront de
                    perpétuer toutes les émotions et les apprentissages
                    dissimulées dans ces volumes qui auraient pu disparaître.
                </Typo>
            </Container>
            <div className="border-primary border-1 h-0.5 w-60 sm:w-180 lg:w-250 mx-auto"></div>
        </>
    );
};
