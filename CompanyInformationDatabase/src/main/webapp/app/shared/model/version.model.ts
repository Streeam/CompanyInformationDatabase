export interface IVersion {
  id?: number;
  versionNumber?: string;
  versionStatus?: string;
  issueNumber?: string;
  productId?: number;
  amendmentId?: number;
  prototypeId?: number;
  routingId?: number;
}

export const defaultValue: Readonly<IVersion> = {};
