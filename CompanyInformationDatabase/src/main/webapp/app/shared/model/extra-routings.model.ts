import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';

export interface IExtraRoutings {
  id?: number;
  overhead?: number;
  resourceName?: string;
  runtime?: number;
  internalNonConformanceId?: number;
  nonconformanceType?: Nonconformance;
  nonconformanceAction?: NonconformanceAction;
  customerNonConformaceId?: number;
}

export const defaultValue: Readonly<IExtraRoutings> = {};
