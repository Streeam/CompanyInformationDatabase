export interface ICompany {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postcode?: string;
  companyLogoContentType?: string;
  companyLogo?: any;
  overheadRate?: number;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
}

export const defaultValue: Readonly<ICompany> = {};
