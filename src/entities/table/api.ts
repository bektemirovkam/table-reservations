import { asyncStorage } from "@/shared/lib/async-storage"
import { Table } from "./model/types";


const ASYNC_STORAGE_KEY = "tables";

export const loadTables = async () => {
    const tables = await asyncStorage.load<Table[]>(ASYNC_STORAGE_KEY);
    return tables || [];
}

export const saveTables = async (tables: Table[]) => {
    return await asyncStorage.save(ASYNC_STORAGE_KEY, tables);
}
