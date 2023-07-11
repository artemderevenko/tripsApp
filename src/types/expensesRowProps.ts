import { ITourExpenses } from './tourExpenses';

export interface IExpensesRowProps extends ITourExpenses {
  onChangeRow: (data: ITourExpenses) => void;
  deleteRow: () => void;
};