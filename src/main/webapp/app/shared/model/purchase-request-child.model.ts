import { Moment } from 'moment';
import { PurchaseRequestStatus } from 'app/shared/model/enumerations/purchase-request-status.model';

export interface IPurchaseRequestChild {
  id?: number;
  quantity?: number;
  orderedDate?: Moment;
  dueDate?: Moment;
  commited?: boolean;
  status?: PurchaseRequestStatus;
  comment?: string;
  productId?: number;
  purchaseRequestParentId?: number;
  salesOrderId?: number;
}

export const defaultValue: Readonly<IPurchaseRequestChild> = {
  commited: false
};
