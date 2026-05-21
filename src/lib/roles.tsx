/**
 * Gestion des rôles utilisateur.
 *
 * L'application distingue trois niveaux d'accès :
 *  - "admin"      : accès complet (gestion des livres, concerts, avis, utilisateurs…)
 *  - "registered" : utilisateur connecté avec accès aux fonctionnalités membres
 *  - "guest"      : visiteur non connecté
 *
 * Le rôle est stocké dans le document Firestore de l'utilisateur (userDocument.role).
 * Firebase Auth n'est utilisé que pour l'authentification, pas pour l'autorisation.
 */
import { ADMIN, GUEST, REGISTERED } from "./session-status";

export type UserRole = typeof ADMIN | typeof REGISTERED | typeof GUEST;

/**
 * Détermine le rôle d'un utilisateur à partir de son état d'authentification.
 * - Pas d'UID → guest (non connecté)
 * - UID présent + rôle "admin" dans Firestore → admin
 * - UID présent sans rôle admin → registered (par défaut)
 */
export const getUserRole = (authUser?: {
    uid?: string;
    userDocument?: { role?: "admin" | "registered" };
}): UserRole => {
    if (!authUser?.uid) return GUEST;
    if (authUser.userDocument?.role === ADMIN) return ADMIN;
    return REGISTERED;
};

/**
 * Vérifie si un rôle donné est autorisé parmi une liste de rôles permis.
 * Utilisé pour contrôler l'accès aux sections admin de l'interface.
 */
export const canAccessRole = (
    userRole: UserRole,
    allowedRoles: UserRole[],
) => {
    return allowedRoles.includes(userRole);
};
