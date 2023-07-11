import { ITourist } from './tourist';
import { ITourExpenses } from './tourExpenses';

export interface ITour {
  [key: string]: any;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  cost: number | null;
  managerId: string | null;
  insurance: string | null;
  touristsList: ITourist[];
  seats: number | null;
  id: string;
  transportType: string;
  color: string | null;
  expenses: ITourExpenses[];
};