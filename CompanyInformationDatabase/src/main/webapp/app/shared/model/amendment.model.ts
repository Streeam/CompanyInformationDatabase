import { Moment } from 'moment';
import { ITask } from 'app/shared/model/task.model';
import { IImage } from 'app/shared/model/image.model';
import { IDrawing } from 'app/shared/model/drawing.model';
import { AmendmentStatus } from 'app/shared/model/enumerations/amendment-status.model';
import { Priority } from 'app/shared/model/enumerations/priority.model';

export interface IAmendment {
  id?: number;
  status?: AmendmentStatus;
  deadline?: Moment;
  priority?: Priority;
  proposedDate?: Moment;
  currentCondition?: string;
  proposeAmendment?: string;
  reasonForChange?: string;
  rejectionReason?: string;
  progress?: number;
  employeeId?: number;
  tasks?: ITask[];
  images?: IImage[];
  drawings?: IDrawing[];
}

export const defaultValue: Readonly<IAmendment> = {};
