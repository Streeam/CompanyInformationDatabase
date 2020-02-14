import { Moment } from 'moment';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { IUser } from './user.model';
import { IRoles } from './roles.model';

export interface IEmployee {
  id?: number;
  imageContentType?: string;
  image?: any;
  jobTitle?: string;
  hiredDate?: Moment;
  user?: IUser;
  role?: IRoles;
  nonConformanceDetails?: INonConformanceDetails[];
  internalNonConformances?: IInternalNonConformance[];
  clientNonConformances?: IClientNonConformance[];
}

export const defaultValue: Readonly<IEmployee> = {};
