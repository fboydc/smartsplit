export interface Expense {
    id: string;
    description: string;
    amount: number;
    category: string;
    allocation_type: string;
  }
  
  export interface Income {
    id: string;
    description: string;
    amount: number;
    frequency: string;
  }
  
  export interface Allocation {
    type: string;
    description: string;
    factor: number;
  }