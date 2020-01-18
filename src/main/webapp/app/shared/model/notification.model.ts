import { Moment } from 'moment';
import { NotificationType } from 'app/shared/model/enumerations/notification-type.model';

export interface INotification {
  id?: number;
  comment?: string;
  read?: boolean;
  format?: NotificationType;
  referencedEmployee?: string;
  sentDate?: Moment;
  employeeId?: number;
}

export const defaultValue: Readonly<INotification> = {
  read: false
};
