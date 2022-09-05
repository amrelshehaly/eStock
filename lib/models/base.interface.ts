export interface positions {
    start:number
    end:number
  }
  
  export type base = {
    count: number;
    index: positions
    memory: any[]
    currentPage: number
    search: string
    startSearching : boolean
    page: string
    loading: boolean
    error:string
  };
  