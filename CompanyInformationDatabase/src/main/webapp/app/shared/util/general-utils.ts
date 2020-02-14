import { isUndefined } from 'util';
import { isNull } from 'lodash';

export const removeDuplicates = (array, key) => {
  const lookup = {};
  const result = [];
  array.forEach(element => {
    if (!lookup[element[key]]) {
      lookup[element[key]] = true;
      result.push(element);
    }
  });
  return result;
};
export const removeDuplicatesBasedOn2Entities = (array, key1, key2) => {
  const lookup = {};
  const result = [];
  array.forEach(element => {
    const combinedString = `${element[key1]} + ${element[key2]}`;
    if (!lookup[combinedString]) {
      lookup[combinedString] = true;
      result.push(element);
    }
  });
  return result;
};
export const removeDuplicatesBasedOnMultipleEntities = (array, arrayOfKeys: string[]) => {
  const lookup = {};
  const result = [];
  array.forEach(element => {
    let combinedString = '';
    arrayOfKeys.forEach(key => combinedString = combinedString.concat(element[key]));
    if (!lookup[combinedString]) {
      lookup[combinedString] = true;
      result.push(element);
    }
  });
  return result;
};

export const isEmpty = (obj: {}) => isNull(obj) || isUndefined(obj) || Object.keys(obj).length === 0;

export const isArrayEmpty = (array: any) => isNull(array) || isUndefined(array) || (Array.isArray(array) && array.length === 0);

export const executeFunctionInChuncks = (veryBigList: any[], functionToExecute: Function, dividedBy: any): Promise<Function> => {
  if (veryBigList.length < dividedBy) {
    return new Promise((resolve, reject) => resolve(functionToExecute(veryBigList)));
  }
  const numberOfTimesToExecutFunction = Math.round(veryBigList.length / dividedBy);
  for (let i = 0; i <= numberOfTimesToExecutFunction; i++) {
    if (i < numberOfTimesToExecutFunction - 1) {
      const sublistToInsert = veryBigList.slice(dividedBy * i, dividedBy + dividedBy * i);
      functionToExecute(sublistToInsert);
    } else if (i === numberOfTimesToExecutFunction - 1) {
      const sublistToInsert = veryBigList.slice(dividedBy * i, veryBigList.length - 1);
      return new Promise((resolve, reject) => resolve(functionToExecute(sublistToInsert)));
    }
  }
};

export const toTitleCase = (s: string) => s && s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase();
