import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { SupplierNonconformaceType } from 'app/shared/model/enumerations/supplier-nonconformace-type.model';

export interface ISupplierNonConformance {
  id?: number;
  action?: NonconformanceAction;
  labour?: number;
  concesionDetails?: string;
  rejectionFee?: number;
  nonConformanceType?: SupplierNonconformaceType;
  employeeId?: number;
  supplierId?: number;
  nonConformanceDetailsId?: number;
}

export const defaultValue: Readonly<ISupplierNonConformance> = {};
