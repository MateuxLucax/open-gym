export type CashFlow = {
  id: number;
  amount: number;
  date: Date;
  description: string;
  type: CashFlowType;
};

export enum CashFlowType {
  Expense = 'Saída',
  Income = 'Entrada'
}

export const defaultCashFlows: CashFlow[] = [
  {
    id: 1,
    amount: 4350,
    date: new Date(2023, 10, 2),
    description: 'Depósito',
    type: CashFlowType.Income
  }
];
