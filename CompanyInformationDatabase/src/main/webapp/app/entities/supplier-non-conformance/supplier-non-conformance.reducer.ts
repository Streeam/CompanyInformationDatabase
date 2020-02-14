import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISupplierNonConformance, defaultValue } from 'app/shared/model/supplier-non-conformance.model';

export const ACTION_TYPES = {
  FETCH_SUPPLIERNONCONFORMANCE_LIST: 'supplierNonConformance/FETCH_SUPPLIERNONCONFORMANCE_LIST',
  FETCH_SUPPLIERNONCONFORMANCE: 'supplierNonConformance/FETCH_SUPPLIERNONCONFORMANCE',
  CREATE_SUPPLIERNONCONFORMANCE: 'supplierNonConformance/CREATE_SUPPLIERNONCONFORMANCE',
  UPDATE_SUPPLIERNONCONFORMANCE: 'supplierNonConformance/UPDATE_SUPPLIERNONCONFORMANCE',
  DELETE_SUPPLIERNONCONFORMANCE: 'supplierNonConformance/DELETE_SUPPLIERNONCONFORMANCE',
  RESET: 'supplierNonConformance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISupplierNonConformance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type SupplierNonConformanceState = Readonly<typeof initialState>;

// Reducer

export default (state: SupplierNonConformanceState = initialState, action): SupplierNonConformanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SUPPLIERNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.UPDATE_SUPPLIERNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.DELETE_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.CREATE_SUPPLIERNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.UPDATE_SUPPLIERNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.DELETE_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUPPLIERNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUPPLIERNONCONFORMANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/supplier-non-conformances';

// Actions

export const getEntities: ICrudGetAllAction<ISupplierNonConformance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE_LIST,
  payload: axios.get<ISupplierNonConformance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ISupplierNonConformance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUPPLIERNONCONFORMANCE,
    payload: axios.get<ISupplierNonConformance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISupplierNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUPPLIERNONCONFORMANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISupplierNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUPPLIERNONCONFORMANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISupplierNonConformance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUPPLIERNONCONFORMANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
