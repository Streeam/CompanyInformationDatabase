import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAuditNonConformance, defaultValue } from 'app/shared/model/audit-non-conformance.model';

export const ACTION_TYPES = {
  FETCH_AUDITNONCONFORMANCE_LIST: 'auditNonConformance/FETCH_AUDITNONCONFORMANCE_LIST',
  FETCH_AUDITNONCONFORMANCE: 'auditNonConformance/FETCH_AUDITNONCONFORMANCE',
  CREATE_AUDITNONCONFORMANCE: 'auditNonConformance/CREATE_AUDITNONCONFORMANCE',
  UPDATE_AUDITNONCONFORMANCE: 'auditNonConformance/UPDATE_AUDITNONCONFORMANCE',
  DELETE_AUDITNONCONFORMANCE: 'auditNonConformance/DELETE_AUDITNONCONFORMANCE',
  RESET: 'auditNonConformance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAuditNonConformance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AuditNonConformanceState = Readonly<typeof initialState>;

// Reducer

export default (state: AuditNonConformanceState = initialState, action): AuditNonConformanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AUDITNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.UPDATE_AUDITNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.DELETE_AUDITNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.CREATE_AUDITNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.UPDATE_AUDITNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.DELETE_AUDITNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AUDITNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AUDITNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_AUDITNONCONFORMANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AUDITNONCONFORMANCE):
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

const apiUrl = 'api/audit-non-conformances';

// Actions

export const getEntities: ICrudGetAllAction<IAuditNonConformance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AUDITNONCONFORMANCE_LIST,
  payload: axios.get<IAuditNonConformance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAuditNonConformance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AUDITNONCONFORMANCE,
    payload: axios.get<IAuditNonConformance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAuditNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AUDITNONCONFORMANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAuditNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AUDITNONCONFORMANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAuditNonConformance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AUDITNONCONFORMANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
