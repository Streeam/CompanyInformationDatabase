import { Moment } from 'moment';
import { IImage } from 'app/shared/model/image.model';
import { IDrawing } from 'app/shared/model/drawing.model';
import { IVersion } from 'app/shared/model/version.model';
import { IBom } from 'app/shared/model/bom.model';
import { IRouting } from 'app/shared/model/routing.model';
import { ISupplier } from 'app/shared/model/supplier.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';

export interface IProduct {
  id?: number;
  partNumber?: string;
  partDescription?: string;
  releaseDate?: Moment;
  productGroupCode?: string;
  site?: string;
  departament?: string;
  methodType?: string;
  methodStatus?: string;
  prime?: boolean;
  unitOfMeasure?: string;
  supplierPartNumber?: string;
  supplierPartDescription?: string;
  curency?: string;
  leadTime?: number;
  minQuantity?: number;
  latestUnitMaterialCost?: number;
  costInSupplierCurrency?: number;
  supplierPrice?: number;
  costInBaseCurrency?: number;
  scrapPercentage?: number;
  onHandStock?: number;
  standardComponentCost?: number;
  standardSubContractCost?: number;
  standardUnitMaterialCost?: number;
  standardSetCost?: number;
  standardRunCost?: number;
  standardLandedCost1?: number;
  standardLandedCost2?: number;
  standardLandedCost3?: number;
  comment1?: string;
  comment2?: string;
  comment3?: string;
  reviewDate1?: Moment;
  reviewDate2?: Moment;
  reviewDate3?: Moment;
  standardTotalCost?: number;
  minBarchSize?: number;
  obsolete?: boolean;
  orderMultipler?: number;
  images?: IImage[];
  drawings?: IDrawing[];
  versions?: IVersion[];
  boms?: IBom[];
  routings?: IRouting[];
  suppliers?: ISupplier[];
  salesOrderId?: number;
  nonConformanceDetails?: INonConformanceDetails[];
}

export const defaultValue: Readonly<IProduct> = {
  prime: false,
  obsolete: false
};
