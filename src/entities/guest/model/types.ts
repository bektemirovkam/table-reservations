type TableId = string

export interface Guest {
    id: string
    name: string
    age: string
    gender: 'male' | 'female'
    side: 'groom'| 'bride'
    tableId?: string
}

export type GuestRecord = Record<TableId, Guest[]>