import { EvenementView } from "./component/evenement.view";
import { Header } from "./component/header.view";
import { PresentationView } from "./component/presentation.view";

export const HomePageView = () => {
    return (
        <>
            <Header />
            <PresentationView />
            <EvenementView />
        </>
    );
};
