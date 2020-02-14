import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';

export interface ISite {
  id?: number;
  site?: string;
  internalNonConformances?: IInternalNonConformance[];
}

export const defaultValue: Readonly<ISite> = {};
