/**
 * AuthUserContext — contexte global de l'utilisateur authentifié.
 *
 * Expose via le hook useAuth() trois valeurs à tous les composants de l'arbre :
 *  - authUser       : profil complet (données Auth + document Firestore)
 *  - authUserIsLoading : true tant que la session n'est pas résolue au démarrage
 *  - reloadAuthUserData : force un rechargement du profil (ex: après un onboarding)
 *
 * Utilisation :
 *   const { authUser, authUserIsLoading } = useAuth();
 */
import useFirebaseAuth from "@/hooks/use-firebase-auth";
import { UserDocument } from "@/types/user";
import { createContext, useContext } from "react";

// Valeur initiale du contexte — utilisée uniquement avant que le hook soit résolu.
// Les composants ne doivent pas rendre de contenu tant que authUserIsLoading est true.
const init = {
    uid: "",
    email: "",
    displayName: "",
    emailVerified: false,
    photoURL: "",
    phoneNumber: "",
    userDocument: {} as UserDocument,
};

const authUserContext = createContext({
    authUser: init,
    authUserIsLoading: true,
    reloadAuthUserData: () => {},
});

interface Props {
    children: React.ReactNode;
}

/**
 * Provider à placer au niveau de _app.tsx pour rendre le contexte
 * disponible dans toute l'application.
 */
export function AuthUserProvider({ children }: Props) {
    const auth = useFirebaseAuth();
    return (
        <authUserContext.Provider
            value={{
                authUser: auth.authUser as {
                    uid: string;
                    email: string;
                    displayName: string;
                    emailVerified: boolean;
                    photoURL: string;
                    phoneNumber: string;
                    userDocument: UserDocument;
                },
                authUserIsLoading: auth.authUserIsLoading,
                reloadAuthUserData: auth.reloadAuthUserData,
            }}
        >
            {children}
        </authUserContext.Provider>
    );
}

/** Hook utilitaire — à utiliser dans n'importe quel composant pour accéder à la session. */
export const useAuth = () => useContext(authUserContext);
