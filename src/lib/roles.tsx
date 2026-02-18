import { ADMIN, GUEST, REGISTERED } from "./session-status";

export type UserRole = typeof ADMIN | typeof REGISTERED | typeof GUEST;

export const getUserRole = (authUser?: {
    uid?: string;
    userDocument?: { role?: "admin" | "registered" };
}): UserRole => {
    if (!authUser?.uid) return GUEST;
    if (authUser.userDocument?.role === ADMIN) return ADMIN;
    return REGISTERED;
};

export const canAccessRole = (
    userRole: UserRole,
    allowedRoles: UserRole[],
) => {
    return allowedRoles.includes(userRole);
};
