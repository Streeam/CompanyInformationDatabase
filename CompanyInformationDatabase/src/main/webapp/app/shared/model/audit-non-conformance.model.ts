import { AuditNonconformaceFirstType } from 'app/shared/model/enumerations/audit-nonconformace-first-type.model';
import { AuditNonconformaceSecondType } from 'app/shared/model/enumerations/audit-nonconformace-second-type.model';

export interface IAuditNonConformance {
  id?: number;
  auditNonConformanceFirstType?: AuditNonconformaceFirstType;
  auditNonConformanceSecondType?: AuditNonconformaceSecondType;
  employeeId?: number;
  nonConformanceDetailsId?: number;
}

export const defaultValue: Readonly<IAuditNonConformance> = {};
