import { ISite } from 'app/shared/model/site.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';

export interface IDepartment {
  id?: number;
  department?: string;
  site?: ISite;
  internalNonConformances?: IInternalNonConformance[];
}

export const defaultValue: Readonly<IDepartment> = {};
