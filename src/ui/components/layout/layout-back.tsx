import Sidebar from "../navbar/sidebar";

interface Props {
    children: React.ReactNode;
}

export const LayoutBack = ({ children }: Props) => {
    return (
        <>
            <Sidebar />
            {children}
        </>
    );
};
