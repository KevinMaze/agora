import { Footer } from "../footer/footer";
import Sidebar from "../navbar/sidebar";

interface Props {
    children: React.ReactNode;
}

export const Layout = ({ children }: Props) => {
    return (
        <>
            <Sidebar />
            {children}
            <Footer />
        </>
    );
};
