"use client";

import { getEvenements } from "@/api/evenements";
import { EvenementDocument } from "@/types/evenement";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GazetteView } from "./gazette-page.view";

export const GazetteContainer = () => {
    const [evenements, setEvenements] = useState<EvenementDocument[]>([]);
    const [isLoadingEvenements, setIsLoadingEvenements] = useState(true);

    useEffect(() => {
        const fetchEvenements = async () => {
            setIsLoadingEvenements(true);
            try {
                const data = await getEvenements();
                setEvenements(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des événements:", error);
                toast.error("Impossible de charger les événements.");
                setEvenements([]);
            } finally {
                setIsLoadingEvenements(false);
            }
        };

        fetchEvenements();
    }, []);

    return (
        <GazetteView
            evenements={evenements}
            isLoadingEvenements={isLoadingEvenements}
        />
    );
};
