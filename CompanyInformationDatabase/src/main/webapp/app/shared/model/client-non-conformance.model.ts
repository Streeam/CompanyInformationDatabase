import { Moment } from 'moment';
import { IEmployee } from 'app/shared/model/employee.model';
import { CustomerNonconformaceType } from 'app/shared/model/enumerations/customer-nonconformace-type.model';
import { Status } from 'app/shared/model/enumerations/status.model';

export interface IClientNonConformance {
  id?: number;
  nonConformanceType?: CustomerNonconformaceType;
  status?: Status;
  nonconformanceDetailsId?: number;
  rejectionReasonDetails?: string;
  actionToBeTakenDetails?: string;
  shortTermDetails?: string;
  longTermDetails?: string;
  currentDate?: Moment;
  rejectionDate?: Moment;
  underWarranty?: boolean;
  quantity?: number;
  labourRate?: number;
  customerId?: number;
  culpableEmployees?: IEmployee[];
}

export const defaultValue: Readonly<IClientNonConformance> = {
  underWarranty: false
};
