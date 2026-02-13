"use client";

import { getBoxes } from "@/api/boxes";
import { BoxDocument } from "@/types/box";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { CollectPageView } from "./collect-page.view";

export const CollectPageContainer = () => {
    const [boxes, setBoxes] = useState<BoxDocument[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchBoxes = async () => {
            setIsLoading(true);
            try {
                const boxesFromDb = await getBoxes();
                setBoxes(boxesFromDb);
            } catch (error) {
                console.error("Erreur lors de la récupération des box:", error);
                toast.error("Erreur lors du chargement des box.");
                setBoxes([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBoxes();
    }, []);

    return <CollectPageView boxes={boxes} isLoading={isLoading} />;
};
