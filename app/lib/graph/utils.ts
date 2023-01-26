export type TransactionData = {
  type: "income" | "expense";
  amount: number;
};

let id = 0;

type CreateTransactionNodeParams = TransactionData & {
  position?: { x: number; y: number };
};

export const createTransactionNode = ({
  amount = 0,
  type,
  position = {
    x: 250,
    y: 300,
  },
}: CreateTransactionNodeParams) => ({
  id: `transaction-${id++}`,
  type: "transaction" as const,
  position,
  data: {
    label: "transaction",
    type,
    amount,
  },
  style: {
    width: 100,
  },
});

export const createIncomeNode = ({
  amount = 0,
  position = { x: 250, y: 100 },
}: Partial<CreateTransactionNodeParams> = {}) =>
  createTransactionNode({ type: "income", amount, position });

export const createExpenseNode = ({
  amount = 0,
  position = { x: 250, y: 500 },
}: Partial<CreateTransactionNodeParams> = {}) =>
  createTransactionNode({ type: "expense", amount, position });
