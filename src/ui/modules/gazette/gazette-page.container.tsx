"use client";

import { getConcerts } from "@/api/concerts";
import { getEvenements } from "@/api/evenements";
import { ConcertDocument } from "@/types/concert";
import { EvenementDocument } from "@/types/evenement";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GazetteView } from "./gazette-page.view";

export const GazetteContainer = () => {
    const [evenements, setEvenements] = useState<EvenementDocument[]>([]);
    const [concerts, setConcerts] = useState<ConcertDocument[]>([]);
    const [isLoadingEvenements, setIsLoadingEvenements] = useState(true);
    const [isLoadingConcerts, setIsLoadingConcerts] = useState(true);

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

    useEffect(() => {
        const fetchConcerts = async () => {
            setIsLoadingConcerts(true);
            try {
                const data = await getConcerts();
                setConcerts(data);
            } catch (error) {
                console.error("Erreur lors de la recuperation des concerts:", error);
                toast.error("Impossible de charger les concerts.");
                setConcerts([]);
            } finally {
                setIsLoadingConcerts(false);
            }
        };

        fetchConcerts();
    }, []);

    return (
        <GazetteView
            evenements={evenements}
            isLoadingEvenements={isLoadingEvenements}
            concerts={concerts}
            isLoadingConcerts={isLoadingConcerts}
        />
    );
};
