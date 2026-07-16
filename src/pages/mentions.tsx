import { Layout } from "@/ui/components/layout/layout";
import Seo from "@/ui/components/seo";
import { Container } from "@/ui/components/container";
import { Typo } from "@/ui/design-system/typography";

const LegalLink = ({ href }: { href: string }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline break-all hover:text-secondary"
    >
        {href}
    </a>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
    <Typo
        variant="title"
        component="h2"
        weight="bold"
        color="primary"
        className="uppercase text-xl sm:text-2xl lg:text-3xl underline underline-offset-4"
    >
        {children}
    </Typo>
);

const SubTitle = ({ children }: { children: React.ReactNode }) => (
    <Typo
        variant="title"
        component="h3"
        weight="bold"
        color="secondary"
        className="uppercase text-base sm:text-lg lg:text-xl"
    >
        {children}
    </Typo>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
    <Typo variant="para" component="p" color="other">
        {children}
    </Typo>
);

const List = ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc space-y-1 pl-5 marker:text-primary">{children}</ul>
);

const Item = ({ children }: { children: React.ReactNode }) => (
    <Typo variant="para" component="li" color="other">
        {children}
    </Typo>
);

const TableWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="overflow-x-auto rounded-lg border-2 border-primary/40">
        <table className="w-full min-w-[560px] border-collapse text-left text-sm">
            {children}
        </table>
    </div>
);

export default function Mention() {
    return (
        <>
            <Seo
                title="Agora - Mentions légales & confidentialité"
                description="Mentions légales, politique de confidentialité et gestion des cookies du site L'Agora."
            />
            <Layout>
                <Container className="py-16">
                    <Typo
                        variant="title"
                        component="h1"
                        weight="bold"
                        color="primary"
                        className="mb-12 text-center uppercase text-3xl underline underline-offset-8 sm:text-5xl lg:text-6xl"
                    >
                        Mentions légales &amp; confidentialité
                    </Typo>

                    <div className="mx-auto max-w-4xl space-y-12">
                        {/* Section 1 */}
                        <section className="my-shadow space-y-6 rounded-2xl bg-foreground p-6 sm:p-10">
                            <div className="space-y-1">
                                <SectionTitle>1. Mentions légales</SectionTitle>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="secondary"
                                    className="text-sm italic"
                                >
                                    Obligatoires en France — article 6-III de la
                                    LCEN
                                </Typo>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>Éditeur du site</SubTitle>
                                <Paragraph>
                                    Le site <strong>L&apos;Agora</strong>,
                                    accessible à l&apos;adresse{" "}
                                    <LegalLink href="https://agora-81452.web.app/" />
                                    , est édité par :
                                </Paragraph>
                                <List>
                                    <Item>
                                        <strong>Dénomination sociale</strong> :
                                        L'AGORA
                                    </Item>
                                    <Item>
                                        <strong>Forme juridique</strong> : SAS
                                    </Item>
                                    <Item>
                                        <strong>Capital social</strong> : 1000 €
                                    </Item>
                                    <Item>
                                        <strong>Siège social</strong> : 3 RUE
                                        CREMIEUX 30000 NIMES
                                    </Item>
                                    <Item>
                                        <strong>RCS</strong> : 30000 Nîmes
                                    </Item>
                                    <Item>
                                        <strong>SIREN/SIRET</strong> : 993317064
                                    </Item>
                                    <Item>
                                        <strong>
                                            N° TVA intracommunautaire
                                        </strong>{" "}
                                        : FR42993317064
                                    </Item>
                                    <Item>
                                        <strong>
                                            Directeur de la publication
                                        </strong>{" "}
                                        : Lavinia, Nawelle PALMART et Jordan,
                                        Jean-Jacques CLUZE / Président /
                                        Directeur général
                                    </Item>
                                    <Item>
                                        <strong>Contact</strong> :
                                        librairiecafeagora@gmail.com
                                    </Item>
                                </List>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>Hébergement</SubTitle>
                                <Paragraph>Le site est hébergé par :</Paragraph>
                                <List>
                                    <Item>
                                        <strong>
                                            Firebase Hosting (Google LLC)
                                        </strong>
                                    </Item>
                                    <Item>
                                        <strong>Google LLC</strong> — 1600
                                        Amphitheatre Parkway, Mountain View, CA
                                        94043, États-Unis
                                    </Item>
                                    <Item>
                                        Site :{" "}
                                        <LegalLink href="https://firebase.google.com" />
                                    </Item>
                                </List>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>Propriété intellectuelle</SubTitle>
                                <Paragraph>
                                    L&apos;ensemble des contenus présents sur le
                                    site (textes, images, logo, charte
                                    graphique, structure) est protégé par le
                                    droit d&apos;auteur et le droit des marques.
                                    Toute reproduction, représentation,
                                    modification ou exploitation, totale ou
                                    partielle, sans autorisation écrite
                                    préalable de [Nom société], est interdite et
                                    constitutive de contrefaçon.
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>Responsabilité</SubTitle>
                                <Paragraph>
                                    L'Agora s&apos;efforce d&apos;assurer
                                    l&apos;exactitude des informations diffusées
                                    sur le site mais ne peut garantir
                                    l&apos;absence d&apos;erreurs ou
                                    d&apos;interruptions. L&apos;utilisateur
                                    reste seul responsable de l&apos;usage
                                    qu&apos;il fait des informations et services
                                    proposés.
                                </Paragraph>
                            </div>
                        </section>

                        {/* Section 2 */}
                        <section className="my-shadow space-y-6 rounded-2xl bg-foreground p-6 sm:p-10">
                            <div className="space-y-1">
                                <SectionTitle>
                                    2. Politique de confidentialité (RGPD)
                                </SectionTitle>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="secondary"
                                    className="text-sm italic"
                                >
                                    Dernière mise à jour : [date]
                                </Typo>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>2.1 Qui sommes-nous ?</SubTitle>
                                <Paragraph>
                                    L'Agora, responsable de traitement, exploite
                                    le site L&apos;Agora. Pour toute question
                                    relative à vos données personnelles : [email
                                    dédié, ex. privacy@... ou dpo@...].
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>2.2 Données collectées</SubTitle>
                                <TableWrapper>
                                    <thead>
                                        <tr className="bg-primary/10">
                                            <th className="p-3 font-bold text-primary">
                                                Donnée
                                            </th>
                                            <th className="p-3 font-bold text-primary">
                                                Finalité
                                            </th>
                                            <th className="p-3 font-bold text-primary">
                                                Base légale
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            [
                                                "Nom, prénom, email, mot de passe (haché)",
                                                "Création et gestion du compte utilisateur",
                                                "Exécution du contrat (CGU)",
                                            ],
                                            [
                                                "Données d'authentification (Firebase Auth)",
                                                "Connexion sécurisée, gestion de session",
                                                "Exécution du contrat",
                                            ],
                                            [
                                                "Données de navigation (Firebase Analytics)",
                                                "Statistiques d'usage, amélioration du service",
                                                "Consentement (cookies non essentiels)",
                                            ],
                                            [
                                                "Données de paiement (via Stripe)",
                                                "Traitement des transactions, facturation",
                                                "Exécution du contrat / obligation légale (comptabilité)",
                                            ],
                                            [
                                                "Données de compte Firestore (contenu créé, préférences)",
                                                "Fonctionnement du service",
                                                "Exécution du contrat",
                                            ],
                                        ].map((row, index) => (
                                            <tr
                                                key={index}
                                                className="border-t border-primary/20"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="p-3 text-other"
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableWrapper>
                                <Paragraph>
                                    Nous ne collectons <strong>jamais</strong>{" "}
                                    vos coordonnées bancaires directement :
                                    elles sont saisies et traitées exclusivement
                                    par Stripe (voir 2.5).
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>2.3 Durée de conservation</SubTitle>
                                <List>
                                    <Item>
                                        <strong>Compte actif</strong> : données
                                        conservées tant que le compte existe.
                                    </Item>
                                    <Item>
                                        <strong>Compte inactif</strong> :
                                        suppression ou anonymisation après [ex.
                                        3 ans] d&apos;inactivité.
                                    </Item>
                                    <Item>
                                        <strong>
                                            Données de facturation/comptables
                                        </strong>{" "}
                                        (une fois Stripe activé) : conservées 10
                                        ans (obligation légale comptable, art.
                                        L123-22 du Code de commerce).
                                    </Item>
                                    <Item>
                                        <strong>Cookies Analytics</strong> :
                                        durée maximale de 13 mois
                                        (recommandation CNIL).
                                    </Item>
                                </List>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>
                                    2.4 Destinataires des données
                                </SubTitle>
                                <Paragraph>
                                    Vos données sont traitées par [Nom société]
                                    et transmises aux sous-traitants suivants,
                                    strictement pour les besoins du service :
                                </Paragraph>
                                <List>
                                    <Item>
                                        <strong>Google Firebase</strong> (Auth,
                                        Firestore, Analytics) — Google LLC,
                                        États-Unis
                                    </Item>
                                    <Item>
                                        <strong>Stripe</strong> (paiements) —
                                        Stripe Inc., États-Unis / Stripe
                                        Payments Europe Ltd, Irlande
                                    </Item>
                                </List>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>
                                    2.5 Transferts hors Union européenne
                                </SubTitle>
                                <Paragraph>
                                    Firebase et Stripe étant opérés par des
                                    sociétés américaines, vos données peuvent
                                    être transférées hors UE. Ces transferts
                                    sont encadrés par :
                                </Paragraph>
                                <List>
                                    <Item>
                                        les{" "}
                                        <strong>
                                            Clauses Contractuelles Types (CCT)
                                        </strong>{" "}
                                        de la Commission européenne, et/ou
                                    </Item>
                                    <Item>
                                        le{" "}
                                        <strong>
                                            Data Privacy Framework UE-US
                                        </strong>{" "}
                                        (pour les entités certifiées).
                                    </Item>
                                </List>
                                <Paragraph>
                                    Vous pouvez vérifier la certification Data
                                    Privacy Framework de Google et Stripe sur{" "}
                                    <LegalLink href="https://www.dataprivacyframework.gov" />
                                    .
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>2.6 Sécurité</SubTitle>
                                <Paragraph>
                                    Les mots de passe sont hachés (gérés
                                    nativement par Firebase Auth). Les
                                    communications sont chiffrées via HTTPS/TLS.
                                    Aucune donnée de paiement n&apos;est stockée
                                    sur nos serveurs (délégation totale à
                                    Stripe, certifié <strong>PCI-DSS</strong>).
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>2.7 Vos droits (RGPD)</SubTitle>
                                <Paragraph>
                                    Conformément au RGPD et à la loi
                                    Informatique et Libertés, vous disposez des
                                    droits suivants :
                                </Paragraph>
                                <List>
                                    <Item>
                                        Droit d&apos;accès, de rectification,
                                        d&apos;effacement
                                    </Item>
                                    <Item>
                                        Droit à la limitation et à
                                        l&apos;opposition du traitement
                                    </Item>
                                    <Item>
                                        Droit à la portabilité de vos données
                                    </Item>
                                    <Item>
                                        Droit de définir des directives
                                        post-mortem
                                    </Item>
                                    <Item>
                                        Droit d&apos;introduire une réclamation
                                        auprès de la <strong>CNIL</strong> (
                                        <LegalLink href="https://www.cnil.fr" />
                                        )
                                    </Item>
                                </List>
                                <Paragraph>
                                    Pour exercer ces droits : [email de
                                    contact]. Réponse sous 1 mois maximum.
                                </Paragraph>
                            </div>
                        </section>

                        {/* Section 3 */}
                        <section className="my-shadow space-y-6 rounded-2xl bg-foreground p-6 sm:p-10">
                            <SectionTitle>
                                3. Politique de gestion des cookies et traceurs
                            </SectionTitle>

                            <div className="space-y-2">
                                <SubTitle>
                                    3.1 Que sont les cookies utilisés ?
                                </SubTitle>
                                <TableWrapper>
                                    <thead>
                                        <tr className="bg-primary/10">
                                            <th className="p-3 font-bold text-primary">
                                                Cookie / traceur
                                            </th>
                                            <th className="p-3 font-bold text-primary">
                                                Finalité
                                            </th>
                                            <th className="p-3 font-bold text-primary">
                                                Type
                                            </th>
                                            <th className="p-3 font-bold text-primary">
                                                Consentement requis
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {[
                                            [
                                                "Firebase Auth (session)",
                                                "Maintenir la connexion utilisateur",
                                                "Essentiel",
                                                "Non",
                                            ],
                                            [
                                                "Firebase Analytics (Google Analytics 4)",
                                                "Mesure d'audience, statistiques",
                                                "Non essentiel",
                                                "Oui",
                                            ],
                                            [
                                                "Cookie Stripe (futur)",
                                                "Sécurité anti-fraude lors du paiement",
                                                "Essentiel",
                                                "Non",
                                            ],
                                        ].map((row, index) => (
                                            <tr
                                                key={index}
                                                className="border-t border-primary/20"
                                            >
                                                {row.map((cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="p-3 text-other"
                                                    >
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </TableWrapper>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>3.2 Consentement</SubTitle>
                                <Paragraph>
                                    Conformément aux recommandations de la CNIL,{" "}
                                    <strong>
                                        seuls les cookies strictement
                                        nécessaires
                                    </strong>{" "}
                                    (session, sécurité du paiement) sont déposés
                                    sans consentement. Firebase Analytics étant
                                    un traceur de mesure d&apos;audience non
                                    exempté, un bandeau de consentement est
                                    affiché au premier accès
                                    (accepter/refuser/personnaliser) et son
                                    déclenchement n&apos;intervient
                                    qu&apos;après acceptation. Vous pouvez
                                    retirer votre consentement à tout moment via
                                    le lien &quot;Gérer mes cookies&quot; en
                                    pied de page.
                                </Paragraph>
                            </div>

                            <div className="space-y-2">
                                <SubTitle>
                                    3.3 Comment gérer vos cookies
                                </SubTitle>
                                <Paragraph>
                                    Vous pouvez à tout moment modifier vos
                                    préférences via le lien &quot;Gérer mes
                                    cookies&quot; présent en bas de chaque page,
                                    ou configurer votre navigateur pour bloquer
                                    les cookies (ce qui peut limiter certaines
                                    fonctionnalités).
                                </Paragraph>
                            </div>
                        </section>
                    </div>
                </Container>
            </Layout>
        </>
    );
}
