"use client";

import { getUsers } from "@/api/users";
import {
    firestoreDeleteDocument,
    firestoreUptadeDocument,
} from "@/api/firestore";
import { useToggle } from "@/hooks/use-toggle";
import { useAuth } from "@/context/AuthUserContext";
import { Modal } from "@/ui/design-system/modal";
import { Card } from "@/ui/design-system/card";
import { Spinner } from "@/ui/design-system/spinner";
import { Typo } from "@/ui/design-system/typography";
import { Button } from "@/ui/design-system/button";
import { Input } from "@/ui/design-system/form/input";
import { Textarea } from "@/ui/design-system/form/textarea";
import { useEffect, useMemo, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { UserDocument } from "@/types/user";

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

type UserEditFormFields = {
    displayName: string;
    role: "admin" | "registered";
    name: string;
    email: string;
    description: string;
    hobbies: string;
    styleLove: string;
    facebook: string;
    twitter: string;
    youtube: string;
    tiktok: string;
    instagram: string;
};

const normalizeStyleLoveForForm = (styleLove?: string | string[]) => {
    if (Array.isArray(styleLove)) {
        return styleLove.join(", ");
    }
    return styleLove || "";
};

const normalizeStyleLoveForStorage = (styleLove: string) => {
    const styles = styleLove
        .split(",")
        .map((style) => style.trim())
        .filter(Boolean);
    return styles.length > 1 ? styles : styles[0] || "";
};

const formatCreationDate = (creationDate?: UserListItem["creation_date"]) => {
    if (!creationDate) return "Non renseignÃ©e";
    if (
        typeof creationDate === "object" &&
        creationDate !== null &&
        typeof creationDate.toDate === "function"
    ) {
        return creationDate.toDate().toLocaleString("fr-FR");
    }
    if (typeof creationDate === "string") return creationDate;
    return "Non renseignÃ©e";
};

const normalizeRole = (role?: string): "admin" | "registered" => {
    return role === "admin" ? "admin" : "registered";
};

const getRoleLabel = (role?: string) => {
    return normalizeRole(role) === "admin" ? "Administrateur" : "Membre";
};

export const AddUsersList = () => {
    const { authUser, authUserIsLoading } = useAuth();
    const USERS_PER_PAGE = 15;
    const [users, setUsers] = useState<UserListItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState<UserListItem | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isEditing, setIsEditing] = useState(false);
    const { value: isUpdating, setValue: setIsUpdating } = useToggle();
    const { value: isDeleting, setValue: setIsDeleting } = useToggle();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<UserEditFormFields>({
        defaultValues: {
            displayName: "",
            name: "",
            email: "",
            role: "registered",
            description: "",
            hobbies: "",
            styleLove: "",
            facebook: "",
            twitter: "",
            youtube: "",
            tiktok: "",
            instagram: "",
        },
    });

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

    const handleOpenDetails = (user: UserListItem) => {
        setSelectedUser(user);
        setIsEditing(false);
        reset({
            displayName: user.displayName || "",
            role: normalizeRole(user.role),
            name: user.name || "",
            email: user.email || "",
            description: user.description || "",
            hobbies: user.hobbies || "",
            styleLove: normalizeStyleLoveForForm(user.styleLove),
            facebook: user.facebook || "",
            twitter: user.twitter || "",
            youtube: user.youtube || "",
            tiktok: user.tiktok || "",
            instagram: user.instagram || "",
        });
    };

    const closeModal = () => {
        setSelectedUser(null);
        setIsEditing(false);
    };

    const onSubmitEdit: SubmitHandler<UserEditFormFields> = async (
        formData,
    ) => {
        if (!selectedUser) return;
        setIsUpdating(true);

        const payload = {
            ...formData,
            role: normalizeRole(formData.role),
            styleLove: normalizeStyleLoveForStorage(formData.styleLove),
        };

        const { error } = await firestoreUptadeDocument(
            "users",
            selectedUser.id,
            payload,
        );

        if (error) {
            setIsUpdating(false);
            toast.error(error.message);
            return;
        }

        setUsers((prev) =>
            prev.map((user) =>
                user.id === selectedUser.id ? { ...user, ...payload } : user,
            ),
        );
        setSelectedUser((prev) => (prev ? { ...prev, ...payload } : prev));
        setIsUpdating(false);
        setIsEditing(false);
        toast.success("Utilisateur modifiÃ© avec succÃ¨s.");
    };

    const handleDelete = async () => {
        if (!selectedUser) return;

        const confirmed = window.confirm(
            "Veux-tu vraiment supprimer cet utilisateur ? Cette action est irrÃ©versible.",
        );
        if (!confirmed) return;

        setIsDeleting(true);
        const { error } = await firestoreDeleteDocument(
            "users",
            selectedUser.id,
        );
        if (error) {
            setIsDeleting(false);
            toast.error(error.message);
            return;
        }

        setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
        setIsDeleting(false);
        toast.success("Utilisateur supprimÃ©.");
        closeModal();
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
                                onAction={() => handleOpenDetails(user)}
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
                title={selectedUser?.displayName || "DÃ©tails utilisateur"}
                contentClassName="!h-auto"
                maxWidthClassName="max-w-3xl"
            >
                {selectedUser && !isEditing && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Email
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.email || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Nom
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.name || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Pseudo
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.displayName ||
                                        "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Rôle
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {getRoleLabel(selectedUser.role)}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Hobbies
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.hobbies || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Styles
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {Array.isArray(selectedUser.styleLove)
                                        ? selectedUser.styleLove.join(", ")
                                        : selectedUser.styleLove ||
                                          "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3 sm:col-span-2">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Description
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.description ||
                                        "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Facebook
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.facebook || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Instagram
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.instagram || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Tiktok
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.tiktok || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Youtube
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.youtube || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3 sm:col-span-2">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Twitter
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.twitter || "Non renseigné"}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Inscription
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {formatCreationDate(
                                        selectedUser.creation_date,
                                    )}
                                </Typo>
                            </div>
                            <div className="border-2 border-primary rounded-lg p-3">
                                <Typo
                                    variant="para"
                                    component="p"
                                    weight="bold"
                                >
                                    Onboarding terminé
                                </Typo>
                                <Typo
                                    variant="para"
                                    component="p"
                                    color="other"
                                >
                                    {selectedUser.onboardingIsCompleted
                                        ? "Oui"
                                        : "Non"}
                                </Typo>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="primary"
                                action={() => setIsEditing(true)}
                            >
                                Editer l&apos;utilisateur
                            </Button>
                            <Button
                                type="button"
                                variant="danger"
                                action={handleDelete}
                                isLoading={isDeleting}
                            >
                                Supprimer l&apos;utilisateur
                            </Button>
                        </div>
                    </div>
                )}

                {selectedUser && isEditing && (
                    <form
                        onSubmit={handleSubmit(onSubmitEdit)}
                        className="flex flex-col gap-4"
                    >
                        <Input
                            label="Pseudo"
                            isLoading={isUpdating}
                            placeholder="Pseudo"
                            type="text"
                            register={register}
                            errors={errors}
                            id="displayName"
                            errorMsg="Tu dois renseigner un pseudo"
                        />
                        <Input
                            label="Nom"
                            isLoading={isUpdating}
                            placeholder="Nom"
                            type="text"
                            register={register}
                            errors={errors}
                            id="name"
                            required={false}
                        />
                        <Input
                            label="Email"
                            isLoading={isUpdating}
                            placeholder="Email"
                            type="email"
                            register={register}
                            errors={errors}
                            id="email"
                            errorMsg="Tu dois renseigner un email"
                        />
                        <Input
                            label="Rôle"
                            isLoading={isUpdating}
                            type="select"
                            register={register}
                            errors={errors}
                            id="role"
                            options={[
                                { value: "registered", label: "Membre" },
                                { value: "admin", label: "Administrateur" },
                            ]}
                        />
                        <Textarea
                            label="Description"
                            isLoading={isUpdating}
                            rows={4}
                            placeholder="Description"
                            register={register}
                            errors={errors}
                            id="description"
                            required={false}
                        />
                        <Input
                            label="Hobbies"
                            isLoading={isUpdating}
                            placeholder="Hobbies"
                            type="text"
                            register={register}
                            errors={errors}
                            id="hobbies"
                            required={false}
                        />
                        <Input
                            label="Style(s) Préféré(s)"
                            isLoading={isUpdating}
                            type="checkbox"
                            register={register}
                            errors={errors}
                            errorMsg="Coche au moins un style"
                            id="styleLove"
                            options={[
                                { value: "Triller", label: "Triller" },
                                { value: "Romance", label: "Romance" },
                                { value: "Action", label: "Action" },
                                { value: "Aventure", label: "Aventure" },
                                {
                                    value: "Science-fiction",
                                    label: "Science-fiction",
                                },
                            ]}
                        />
                        <Input
                            label="Facebook"
                            isLoading={isUpdating}
                            placeholder="facebook.com/..."
                            type="url"
                            register={register}
                            errors={errors}
                            id="facebook"
                            required={false}
                        />
                        <Input
                            label="Instagram"
                            isLoading={isUpdating}
                            placeholder="instagram.com/..."
                            type="url"
                            register={register}
                            errors={errors}
                            id="instagram"
                            required={false}
                        />
                        <Input
                            label="Tiktok"
                            isLoading={isUpdating}
                            placeholder="tiktok.com/..."
                            type="url"
                            register={register}
                            errors={errors}
                            id="tiktok"
                            required={false}
                        />
                        <Input
                            label="Youtube"
                            isLoading={isUpdating}
                            placeholder="youtube.com/..."
                            type="url"
                            register={register}
                            errors={errors}
                            id="youtube"
                            required={false}
                        />
                        <Input
                            label="Twitter"
                            isLoading={isUpdating}
                            placeholder="x.com/..."
                            type="url"
                            register={register}
                            errors={errors}
                            id="twitter"
                            required={false}
                        />

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="primary"
                                action={() => setIsEditing(false)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit" isLoading={isUpdating}>
                                Enregistrer
                            </Button>
                        </div>
                    </form>
                )}
            </Modal>
        </div>
    );
};
