import { asyncStorage } from "@/shared/lib/async-storage"
import { Guest } from "./model/types";


const ASYNC_STORAGE_KEY = "guests";

export const loadGuests = async () => {
    const guests = await asyncStorage.load<Guest[]>(ASYNC_STORAGE_KEY);
    return guests || [];
}

export const saveGuests = async (guests: Guest[]) => {
    return await asyncStorage.save(ASYNC_STORAGE_KEY, guests);
}
