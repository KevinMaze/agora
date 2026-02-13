import { BoxDocument } from "@/types/box";
import { HearderCollect } from "./components/hearder-collect.view";
import { PresentationCollect } from "./components/presentation.view";
import { SoldCollect } from "./components/sold-collect.vew";

interface Props {
    boxes: BoxDocument[];
    isLoading: boolean;
}

export const CollectPageView = ({ boxes, isLoading }: Props) => {
    return (
        <>
            <HearderCollect />
            <PresentationCollect />
            <SoldCollect boxes={boxes} isLoading={isLoading} />
        </>
    );
};
