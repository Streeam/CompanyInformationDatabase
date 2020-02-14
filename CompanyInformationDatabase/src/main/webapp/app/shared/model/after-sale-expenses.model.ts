import { Moment } from 'moment';

export interface IAfterSaleExpenses {
  id?: number;
  date?: Moment;
  description?: string;
  cost?: number;
  employeeId?: number;
  customerNonConformanceId?: number;
}

export const defaultValue: Readonly<IAfterSaleExpenses> = {};
