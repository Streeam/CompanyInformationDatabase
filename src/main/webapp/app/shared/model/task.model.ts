import { Moment } from 'moment';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface ITask {
  id?: number;
  taskDescription?: string;
  startDate?: Moment;
  endDate?: Moment;
  progress?: number;
  status?: Status;
  priority?: Priority;
  nonconformanceId?: number;
  employeeId?: number;
  amendmentId?: number;
  progressTracks?: IProgressTrack[];
}

export const defaultValue: Readonly<ITask> = {};
