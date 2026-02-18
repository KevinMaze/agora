"use client";

import { getUsers } from "@/api/users";
import { useAuth } from "@/context/AuthUserContext";
import { Card } from "@/ui/design-system/card";
import { Modal } from "@/ui/design-system/modal";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { UserDocument } from "@/types/user";
import { Button } from "@/ui/design-system/button";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type UserListItem = Partial<UserDocument> & {
    id: string;
    role?: "admin" | "registered";
    uid?: string;
    displayName?: string;
    name?: string;
    email?: string;
    photoURL?: string | null;
    description?: string;
    hobbies?: string;
    styleLove?: string | string[];
    facebook?: string;
    twitter?: string;
    youtube?: string;
    tiktok?: string;
    instagram?: string;
    onboardingIsCompleted?: boolean;
    creation_date?: { toDate?: () => Date } | string | null;
};

const normalizeRole = (role?: string): "admin" | "registered" => {
    return role === "admin" ? "admin" : "registered";
};

const getRoleLabel = (role?: string) => {
    return normalizeRole(role) === "admin" ? "Administrateur" : "Membre";
};

const formatCreationDate = (creationDate?: UserListItem["creation_date"]) => {
    if (!creationDate) return "Non renseignée";
    if (
        typeof creationDate === "object" &&
        creationDate !== null &&
        typeof creationDate.toDate === "function"
    ) {
        return creationDate.toDate().toLocaleString("fr-FR");
    }
    if (typeof creationDate === "string") return creationDate;
    return "Non renseignée";
};

export const UsersList = () => {
    const { authUser, authUserIsLoading } = useAuth();
    const USERS_PER_PAGE = 15;
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const data = await getUsers();
            const normalized = data
                .map((user) => ({
                    id: user.id,
                    uid: user.uid || user.id,
                    role: normalizeRole(user.role),
                    displayName: user.displayName || "",
                    name: user.name || "",
                    email: user.email || "",
                    photoURL: user.photoURL || null,
                    description: user.description || "",
                    hobbies: user.hobbies || "",
                    styleLove: user.styleLove || "",
                    facebook: user.facebook || "",
                    twitter: user.twitter || "",
                    youtube: user.youtube || "",
                    tiktok: user.tiktok || "",
                    instagram: user.instagram || "",
                    onboardingIsCompleted: !!user.onboardingIsCompleted,
                    creation_date: user.creation_date || null,
                }))
                .filter((user) => !!user.id) as UserListItem[];
            setUsers(normalized);
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs:", error);
            toast.error("Impossible de charger les utilisateurs.");
            setUsers([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (authUserIsLoading) return;
        if (!authUser?.uid) return;
        fetchUsers();
    }, [authUserIsLoading, authUser?.uid]);

    const closeModal = () => {
        setSelectedUser(null);
    };

    const normalizedSearchQuery = useMemo(
        () =>
            searchQuery
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
                .trim(),
        [searchQuery],
    );

    const filteredUsers = useMemo(() => {
        if (!normalizedSearchQuery) return users;

        return users.filter((user) => {
            const displayName = (user.displayName || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            const email = (user.email || "")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase();
            const role = getRoleLabel(user.role).toLowerCase();
            return (
                displayName.includes(normalizedSearchQuery) ||
                email.includes(normalizedSearchQuery) ||
                role.includes(normalizedSearchQuery)
            );
        });
    }, [users, normalizedSearchQuery]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredUsers.length / USERS_PER_PAGE),
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [normalizedSearchQuery]);

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(totalPages);
        }
    }, [currentPage, totalPages]);

    const paginatedUsers = useMemo(() => {
        const start = (currentPage - 1) * USERS_PER_PAGE;
        const end = start + USERS_PER_PAGE;
        return filteredUsers.slice(start, end);
    }, [filteredUsers, currentPage, USERS_PER_PAGE]);

    return (
        <div className="w-full mt-12">
            <Typo
                variant="title"
                component="h2"
                className="text-2xl mb-6 text-center uppercase underline"
            >
                Membres inscrits
            </Typo>

            <div className="w-full max-w-md mx-auto mb-8">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Rechercher par pseudo, email ou rôle"
                    className="w-full px-4 py-2 border-2 border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-other placeholder-gray-500"
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Spinner size="large" />
                </div>
            ) : filteredUsers.length === 0 ? (
                <Typo variant="para" component="p" className="text-center">
                    Aucun utilisateur trouvé pour cette recherche.
                </Typo>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center text-[12px]">
                        {paginatedUsers.map((user) => (
                            <Card
                                key={user.id}
                                src={user.photoURL || undefined}
                                title={user.displayName || "Utilisateur"}
                                autor={`${getRoleLabel(user.role)} - ${user.email || "Email non renseigné"}`}
                                onAction={() => setSelectedUser(user)}
                            />
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="mt-8 flex items-center justify-center gap-4">
                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === 1 ? "disabled" : "primary"
                                }
                                disabled={currentPage === 1}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(1, prev - 1),
                                    )
                                }
                                icon={{ icon: FaChevronLeft }}
                                iconPosition="left"
                            >
                                Précédent
                            </Button>

                            <Typo variant="para" component="p">
                                Page {currentPage} / {totalPages}
                            </Typo>

                            <Button
                                type="button"
                                size="small"
                                variant={
                                    currentPage === totalPages
                                        ? "disabled"
                                        : "primary"
                                }
                                disabled={currentPage === totalPages}
                                action={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(totalPages, prev + 1),
                                    )
                                }
                                icon={{ icon: FaChevronRight }}
                                iconPosition="right"
                            >
                                Suivant
                            </Button>
                        </div>
                    )}
                </>
            )}

            <Modal
                isOpen={!!selectedUser}
                onClose={closeModal}
                title={selectedUser?.displayName || "Détails utilisateur"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-3xl"
            >
                {selectedUser && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Email
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.email || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Nom
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.name || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Pseudo
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.displayName || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Rôle
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {getRoleLabel(selectedUser.role)}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Hobbies
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.hobbies || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Styles
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {Array.isArray(selectedUser.styleLove)
                                        ? selectedUser.styleLove.join(", ")
                                        : selectedUser.styleLove ||
                                          "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3 sm:col-span-2">
                                <Typo variant="para" component="p" weight="bold">
                                    Description
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.description || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Facebook
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.facebook || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Instagram
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.instagram || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Tiktok
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.tiktok || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Youtube
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.youtube || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3 sm:col-span-2">
                                <Typo variant="para" component="p" weight="bold">
                                    Twitter
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.twitter || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Inscription
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {formatCreationDate(selectedUser.creation_date)}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo variant="para" component="p" weight="bold">
                                    Onboarding terminé
                                </Typo>
                                <Typo variant="para" component="p" color="other">
                                    {selectedUser.onboardingIsCompleted
                                        ? "Oui"
                                        : "Non"}
                                </Typo>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};
