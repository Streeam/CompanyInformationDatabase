import { Moment } from 'moment';

export interface IProgressTrack {
  id?: number;
  progressDescription?: any;
  complete?: boolean;
  date?: Moment;
  taskId?: number;
}

export const defaultValue: Readonly<IProgressTrack> = {
  complete: false
};
