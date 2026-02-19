import { ConcertDocument } from "@/types/concert";
import { EvenementDocument } from "@/types/evenement";
import { EvenementGazette } from "./components/evenement-gazette.view";
import { GalleryGazette } from "./components/galery-gazette.view";
import { HardRockCoffee } from "./components/hard-rock-gazette.view";
import { HeaderGazette } from "./components/header-gazette.view";
import { LiveGazette } from "./components/live-gazette.view";
import { SoonGazette } from "./components/soon-gazette.view";

interface Props {
    evenements: EvenementDocument[];
    isLoadingEvenements: boolean;
    concerts: ConcertDocument[];
    isLoadingConcerts: boolean;
}

export const GazetteView = ({
    evenements,
    isLoadingEvenements,
    concerts,
    isLoadingConcerts,
}: Props) => {
    return (
        <>
            <HeaderGazette />
            <LiveGazette />
            <EvenementGazette
                evenements={evenements}
                isLoading={isLoadingEvenements}
            />
            <HardRockCoffee concerts={concerts} isLoading={isLoadingConcerts} />
            <GalleryGazette />
            <SoonGazette concerts={concerts} isLoading={isLoadingConcerts} />
        </>
    );
};
