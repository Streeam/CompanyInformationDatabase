export interface IShortTermAction {
  id?: number;
  description?: string;
  nonConformanceId?: number;
}

export const defaultValue: Readonly<IShortTermAction> = {};
