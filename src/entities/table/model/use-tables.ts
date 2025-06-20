import { useEffect, useId, useState } from "react";
import { Table } from "./types";
import { loadTables, saveTables } from "../api";

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);

    const id = useId()

    const fecthTables = async () => {
        const data = await loadTables()
        setTables(data);
    }

    useEffect(() => {
        fecthTables()
    }, []);
    

    const addTable = () => {
        const table: Table = {
            id,
        };
        setTables((prev) => [...prev, table]);
        saveTables(tables);
    }

    const removeTable = (tableId: string) => {
        setTables((prev) => prev.filter((table) => table.id !== tableId));
        saveTables(tables);
    }


    return {
        tables,
        addTable,
        removeTable,
    };
}