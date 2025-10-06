import clsx from "clsx";

interface Props {
    children: React.ReactNode;
    className?: string;
}

export const Container: React.FC<Props> = ({ children, className }) => {
    return (
        <div
            className={clsx(
                "w-full max-w-7xl mx-auto px-5 space-y-5 lg:px-10",
                className
            )}
        >
            {children}
        </div>
    );
};
