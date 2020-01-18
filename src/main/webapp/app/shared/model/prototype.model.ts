import { Moment } from 'moment';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface IPrototype {
  id?: number;
  status?: Status;
  deadline?: Moment;
  priority?: Priority;
  proposedDate?: Moment;
  progress?: number;
}

export const defaultValue: Readonly<IPrototype> = {};
