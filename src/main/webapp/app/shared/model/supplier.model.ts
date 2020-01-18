import { IProduct } from 'app/shared/model/product.model';

export interface ISupplier {
  id?: number;
  supplierCode?: string;
  supplierName?: string;
  supplierStatus?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  companyId?: number;
  products?: IProduct[];
}

export const defaultValue: Readonly<ISupplier> = {};
