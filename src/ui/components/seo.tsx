import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Icon from "@/../public/assets/images/icon-agora.png";

const SITE_URL = "https://lagoranimes.fr";

interface SeoProps {
    title?: string;
    description?: string;
    noIndex?: boolean;
}

const Seo = ({ title, description, noIndex }: SeoProps): React.ReactElement => {
    const { asPath } = useRouter();
    const path = asPath.split(/[?#]/)[0];
    const url = SITE_URL + (path === "/" ? "/" : path.replace(/\/$/, ""));

    return (
        <Head>
            <title>{title}</title>
            <link rel="canonical" href={url} />
            <meta property="og:url" content={url} />
            <meta name="description" content={description} />
            <meta
                name="robots"
                content={noIndex ? "noindex, nofollow" : "index, follow"}
            />
            <meta property="og:type" content="website" />
            <meta property="og:locale" content="fr_FR" />
            <meta property="og:site_name" content="L'Agora" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href={Icon.src} />
        </Head>
    );
};

export default Seo;
