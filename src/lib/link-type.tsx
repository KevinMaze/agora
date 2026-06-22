/**
 * Types de lien utilisés dans le composant Button.
 *
 * "internal" → rendu via <Link> de Next.js (navigation côté client, préfetch)
 * "external" → rendu via <a target="_blank"> (ouverture dans un nouvel onglet)
 */
export type LinkType = "internal" | "external";

export const LinkTypes: Record<string, LinkType> = {
    INTERNAL: "internal",
    EXTERNAL: "external",
};
