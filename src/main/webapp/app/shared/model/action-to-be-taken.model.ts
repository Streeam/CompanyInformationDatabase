export interface IActionToBeTaken {
  id?: number;
  why1Occurrance?: string;
  why2Occurrance?: string;
  why3Occurrance?: string;
  why4Occurrance?: string;
  why5Occurrance?: string;
  why1Detection?: string;
  why2Detection?: string;
  why3Detaction?: string;
  why4Detection?: string;
  why5Detection?: string;
  rootCause?: string;
  problem?: string;
  nonconformanceId?: number;
}

export const defaultValue: Readonly<IActionToBeTaken> = {};
