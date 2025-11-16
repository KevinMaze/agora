import { AproposHeaderView } from "./components/apropos-header.view";
import { AproposFormView } from "./components/form.view";
import { MapView } from "./components/map.view";
import { AproposPresentationView } from "./components/presentation.view";

export const AproposView = () => {
    return (
        <>
            <AproposHeaderView />
            <AproposPresentationView />
            <AproposFormView />
            <MapView />
        </>
    );
};
