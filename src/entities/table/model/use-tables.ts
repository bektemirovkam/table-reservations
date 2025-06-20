import { useEffect, useId, useState } from "react";
import { Table } from "./types";
import { loadTables, saveTables } from "../api";

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);

    const fecthTables = async () => {
        const data = await loadTables()
        setTables(data);
    }

    useEffect(() => {
        fecthTables()
    }, []);
    

    const addTable = () => {
        const table: Table = {
            id: `${Date.now()}-${Math.random()}`
        };
        setTables((prev) => {
            const newTables = [...prev, table];
            saveTables(newTables);
            return newTables;
        });
    }

    const removeTable = (tableId: string) => {
        setTables((prev) => {
            const newTables = prev.filter((table) => table.id !== tableId);
            saveTables(newTables);
            return newTables;
        });
    }


    return {
        tables,
        addTable,
        removeTable,
    };
}