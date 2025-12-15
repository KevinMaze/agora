import { Container } from "../container";
import { Footer } from "../footer/footer";
import Sidebar from "../navbar/sidebar";
import { useRouter } from "next/router";
import { UserAccountNavigation } from "../sidebar-user/user-account-navigation";

interface Props {
    children: React.ReactNode;
    withSideBar?: boolean;
}

export const Layout = ({ children, withSideBar }: Props) => {
    const router = useRouter();
    let view: React.ReactElement = <></>;

    if (withSideBar) {
        view = (
            <Container className="mb-14">
                <div className="grid grid-cols-12 gap-7">
                    <div className="col-span-3">
                        <UserAccountNavigation />
                    </div>
                    <div className="col-span-9">{children}</div>
                </div>
            </Container>
        );
    } else {
        view = <>{children}</>;
    }

    return (
        <>
            <Sidebar />
            {view}
            {!router.pathname.includes("/mon_espace") && <Footer />}
        </>
    );
};
