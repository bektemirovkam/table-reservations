type TableId = string

export interface Quest {
    id: string
    name: string
    age: number
    gender: 'male' | 'female'
    side: 'groom'| 'bride'
    tableId?: string
}

export type QuestRecord = Record<TableId, Quest[]>