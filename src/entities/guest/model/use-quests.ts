import { useEffect, useMemo, useState } from "react";

import { loadQuests, saveQuests } from "../api";
import { Quest, QuestRecord } from "./types";

export const useQuests = () => {
    const [quests, setQuests] = useState<Quest[]>([]);

    const fecthQuests = async () => {
        const data = await loadQuests()
        setQuests(data);
    }

    useEffect(() => {
        fecthQuests()
    }, []);
    
    const questsRecord: QuestRecord = useMemo(() =>  quests.reduce((acc, quest) => {
        const tableId = quest.tableId!;

        if (!acc[tableId]) {
            acc[tableId] = [];
        }
        acc[tableId].push(quest);

        return acc;
    }, {} as QuestRecord), [quests]);

    const addQuest = (quest: Quest) => {
        setQuests((prev) => [...prev, quest]);
        saveQuests(quests);
    }

    const removeQuest = (questId: string) => {
        setQuests((prev) => prev.filter((quest) => quest.id !== questId));
        saveQuests(quests);
    }


    return {
        questsRecord,
        addQuest,
        removeQuest,
    };
}