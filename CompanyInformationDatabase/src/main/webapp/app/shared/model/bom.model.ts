import { IProduct } from 'app/shared/model/product.model';

export interface IBom {
  id?: number;
  quantity?: number;
  sequenceNumber?: number;
  partNumber?: string;
  childPartNumber?: string;
  uniqueIdentifier?: string;
  products?: IProduct[];
}

export const defaultValue: Readonly<IBom> = {};
