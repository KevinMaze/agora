import React from "react";
import Head from "next/head";
import Icon from "@/../public/assets/images/icon-agora.png";

interface SeoProps {
    title?: string;
    description?: string;
}

const Seo = ({ title, description }: SeoProps): React.ReactElement => {
    return (
        <Head>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href={Icon.src} />
        </Head>
    );
};

export default Seo;
