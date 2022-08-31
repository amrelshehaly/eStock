export interface HeaderRow {
    id?: string
    key: string[]
    type?: string
    name: string
    format?: (cell: unknown) => string 
  }

export interface DataRow {
    headers: HeaderRow[]
    data: Record<string, unknown>[]
    actions?: React.ReactNode
  }