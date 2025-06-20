import { asyncStorage } from "@/shared/lib/async-storage"
import { Quest } from "./model/types";


const ASYNC_STORAGE_KEY = "quests";

export const loadQuests = async () => {
    const quests = await asyncStorage.load<Quest[]>(ASYNC_STORAGE_KEY);
    return quests || [];
}

export const saveQuests = async (quests: Quest[]) => {
    return await asyncStorage.save(ASYNC_STORAGE_KEY, quests);
}
