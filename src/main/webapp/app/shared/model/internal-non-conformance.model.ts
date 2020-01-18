import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { ISite } from 'app/shared/model/site.model';
import { IDepartment } from 'app/shared/model/department.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IInternalNonConformance {
  id?: number;
  action?: NonconformanceAction;
  curentDate?: Moment;
  rejectionDate?: Moment;
  rejectionReasonDetails?: string;
  labourRate?: number;
  nonconformanceDetailsId?: number;
  status?: Status;
  quantity?: number;
  employees?: IEmployee[];
  sites?: ISite[];
  departments?: IDepartment[];
}

export const defaultValue: Readonly<IInternalNonConformance> = {};
