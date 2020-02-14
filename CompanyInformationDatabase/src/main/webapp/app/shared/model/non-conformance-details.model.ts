import { Moment } from 'moment';
import { IProduct } from 'app/shared/model/product.model';
import { IRouting } from 'app/shared/model/routing.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { IEmployee } from './employee.model';
import { IActionToBeTaken } from './action-to-be-taken.model';
import { ILongTermAction } from './long-term-action.model';
import { IShortTermAction } from './short-term-action.model';
import { INonConformanceType } from './non-conformance-type.model';

export interface INonConformanceDetails {
  id?: number;
  deadline?: Moment;
  status?: Status;
  progress?: number;
  priority?: Priority;
  nonconformance?: Nonconformance;
  products?: IProduct[];
  routings?: IRouting[];
  employee?: IEmployee;
  nonConformanceType?: INonConformanceType;
  currentDate?: Moment;
}

export const defaultValue: Readonly<INonConformanceDetails> = {};
