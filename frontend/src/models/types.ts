export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    allocation_type: number;
  }
  
  export interface Income {
    id: string;
    description: string;
    amount: number;
    frequency: string;
  }
  
  export interface Allocation {
    type: number;
    description: string;
    factor: number;
  }

  export interface AllocationGroup {
    allocation_name: string;
    allocation_total: number;
    allocation_pct: number;
    expenses: Expense[];
  }