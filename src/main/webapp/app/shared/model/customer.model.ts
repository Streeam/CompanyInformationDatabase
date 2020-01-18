export interface ICustomer {
  id?: number;
  customerCode?: string;
  customerName?: string;
  customerStatus?: string;
  country?: string;
  customerCurency?: string;
  address?: string;
  website?: string;
  email?: string;
}

export const defaultValue: Readonly<ICustomer> = {};
