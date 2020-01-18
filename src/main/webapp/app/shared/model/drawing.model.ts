export interface IDrawing {
  id?: number;
  drawingNumber?: string;
  drawingIssue?: string;
  urlPath?: string;
  productId?: number;
  amendmentId?: number;
  nonConformanceDetailsId?: number;
}

export const defaultValue: Readonly<IDrawing> = {};
