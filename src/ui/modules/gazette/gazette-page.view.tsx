import { EvenementGazette } from "./components/evenement-gazette.view";
import { GalleryGazette } from "./components/galery-gazette.view";
import { HardRockCoffee } from "./components/hard-rock-gazette.view";
import { HeaderGazette } from "./components/header-gazette.view";
import { LiveGazette } from "./components/live-gazette.view";
import { SoonGazette } from "./components/soon-gazette.view";

export const GazetteView = () => {
    return (
        <>
            <HeaderGazette />
            <LiveGazette />
            <EvenementGazette />
            <HardRockCoffee />
            <GalleryGazette />
            <SoonGazette />
        </>
    );
};
