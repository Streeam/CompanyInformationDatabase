import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';

export interface IExtraBoms {
  id?: number;
  partNumber?: string;
  partDescription?: string;
  price?: number;
  quantity?: number;
  nonconformanceType?: Nonconformance;
  nonconformanceAction?: NonconformanceAction;
  internalNonconformanceId?: number;
  customerNonConformaceId?: number;
}

export const defaultValue: Readonly<IExtraBoms> = {};
