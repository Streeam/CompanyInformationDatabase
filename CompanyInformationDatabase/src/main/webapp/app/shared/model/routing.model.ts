import { IVersion } from 'app/shared/model/version.model';
import { IProduct } from 'app/shared/model/product.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';

export interface IRouting {
  id?: number;
  resourceName?: string;
  resourceType?: string;
  unitRunTime?: number;
  partNumber?: string;
  layoutTime?: number;
  uniqueIdentifier?: string;
  versions?: IVersion[];
  products?: IProduct[];
  nonConformancesDetails?: INonConformanceDetails[];
}

export const defaultValue: Readonly<IRouting> = {};
