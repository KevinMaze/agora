/**
 * Constantes des statuts de session.
 * Utilisées dans Session (garde de route) et dans les layouts pour
 * définir quel type d'utilisateur peut accéder à une page.
 *
 * GUEST      → page réservée aux visiteurs non connectés (ex: /connexion)
 * REGISTERED → page réservée aux utilisateurs connectés (ex: /mon_espace)
 * ADMIN      → utilisé dans les vérifications de rôle (canAccessRole)
 */
export const GUEST = "guest";
export const REGISTERED = "registered";
export const ADMIN = "admin";
