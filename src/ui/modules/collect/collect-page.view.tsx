import { HearderCollect } from "./components/hearder-collect.view";
import { PresentationCollect } from "./components/presentation.view";
import { SoldCollect } from "./components/sold-collect.vew";

export const CollectPageView = () => {
    return (
        <>
            <HearderCollect />
            <PresentationCollect />
            <SoldCollect />
        </>
    );
};
