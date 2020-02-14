import { Moment } from 'moment';

export interface IImage {
  id?: number;
  urlPath?: string;
  name?: string;
  lastModifiedDate?: Moment;
  size?: number;
  type?: string;
  taskId?: number;
  nonconformanceDetailsId?: number;
  progressTrackId?: number;
  productId?: number;
  amendmentId?: number;
}

export const defaultValue: Readonly<IImage> = {};
