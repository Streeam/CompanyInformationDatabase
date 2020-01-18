import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';

export interface IPurchaseRequestParent {
  id?: number;
  pdfURLPath?: string;
  employeeId?: number;
  purchaseRequestChildren?: IPurchaseRequestChild[];
}

export const defaultValue: Readonly<IPurchaseRequestParent> = {};
