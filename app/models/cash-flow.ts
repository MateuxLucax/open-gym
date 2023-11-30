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
    amount: 4352.43,
    date: new Date(2023, 10, 2),
    description: 'Depósito',
    type: CashFlowType.Income
  },
  {
    id: 2,
    amount: 3912.43,
    date: new Date(2023, 10, 3),
    description: 'Retirada de salário',
    type: CashFlowType.Expense
  },
  {
    id: 3,
    amount: 432.39,
    date: new Date(2023, 10, 4),
    description: 'Pagamento manutenção',
    type: CashFlowType.Expense
  },
  {
    id: 4,
    amount: 7530.32,
    date: new Date(2023, 10, 7),
    description: 'Pagamentos de mensalidades',
    type: CashFlowType.Income
  },
  {
    id: 5,
    amount: 5329.19,
    date: new Date(2023, 10, 15),
    description: 'Pagamentos de vendas',
    type: CashFlowType.Income
  },
  {
    id: 6,
    amount: 4319.4,
    date: new Date(2023, 10, 19),
    description: 'Salário de Instrutores',
    type: CashFlowType.Expense
  },
  {
    id: 7,
    amount: 463.3,
    date: new Date(2023, 10, 23),
    description: 'Manutenção geral',
    type: CashFlowType.Expense
  }
];
