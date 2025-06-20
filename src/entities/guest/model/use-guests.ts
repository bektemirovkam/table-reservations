import { useEffect, useMemo, useState } from "react";

import { loadGuests, saveGuests } from "../api";
import { Guest, GuestRecord } from "./types";

export const useGuests = () => {
    const [guests, setGuests] = useState<Guest[]>([]);

    const fecthGuests = async () => {
        const data = await loadGuests()
        setGuests(data);
    }

    useEffect(() => {
        fecthGuests()
    }, []);
    
    const guestsRecord: GuestRecord = useMemo(() =>  guests.reduce((acc, guest) => {
        const tableId = guest.tableId!;

        if (!acc[tableId]) {
            acc[tableId] = [];
        }
        acc[tableId].push(guest);

        return acc;
    }, {} as GuestRecord), [guests]);

    const addGuest = (guest: Guest) => {
        setGuests((prev) => {
            const newGuests = [...prev, guest];
            saveGuests(newGuests);
            return newGuests;
        });
    }

    const removeGuest = (guestId: string) => {
        setGuests((prev) => {
            const newGuests = prev.filter((guest) => guest.id !== guestId);
            saveGuests(newGuests);
            return newGuests;
        });
    }

    return {
        guestsRecord,
        addGuest,
        removeGuest,
    };
}