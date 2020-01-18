export interface IProcessAuditChecklist {
  id?: number;
  auditQuestion?: string;
  compliant?: boolean;
  ofi?: boolean;
  minorNC?: boolean;
  majorNC?: boolean;
  auditAnswer?: string;
  opportunitiesForImprovement?: string;
  nonConformanceId?: number;
}

export const defaultValue: Readonly<IProcessAuditChecklist> = {
  compliant: false,
  ofi: false,
  minorNC: false,
  majorNC: false
};
