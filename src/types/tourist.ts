export interface ITourist {
  [key: string]: any;
  clientId: string;
  paymentAmount: number | null;
  seatNumber: number | null;
  firstName: string;
  lastName: string;
  middleName: string;
  passport: string;
};