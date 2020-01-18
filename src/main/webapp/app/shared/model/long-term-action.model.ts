export interface ILongTermAction {
  id?: number;
  nonConformanceId?: number;
  description?: string;
}

export const defaultValue: Readonly<ILongTermAction> = {};
