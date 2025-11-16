import { EvenementGazette } from "./components/evenement-gazette.view";
import { HeaderGazette } from "./components/header-gazette.view";
import { LiveGazette } from "./components/live-gazette.view";

export const GazetteView = () => {
    return (
        <>
            <HeaderGazette />
            <LiveGazette />
            <EvenementGazette />
        </>
    );
};
