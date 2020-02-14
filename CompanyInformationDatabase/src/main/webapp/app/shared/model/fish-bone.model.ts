import { FishBoneTypes } from 'app/shared/model/enumerations/fish-bone-types.model';

export interface IFishBone {
  id?: number;
  fishboneTypes?: FishBoneTypes;
  subCategory?: string;
  rootCauseId?: number;
}

export const defaultValue: Readonly<IFishBone> = {};
