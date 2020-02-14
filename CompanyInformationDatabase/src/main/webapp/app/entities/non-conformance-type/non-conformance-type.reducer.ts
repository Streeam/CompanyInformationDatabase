import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INonConformanceType, defaultValue } from 'app/shared/model/non-conformance-type.model';

export const ACTION_TYPES = {
  FETCH_NONCONFORMANCETYPE_LIST: 'nonConformanceType/FETCH_NONCONFORMANCETYPE_LIST',
  FETCH_NONCONFORMANCETYPE: 'nonConformanceType/FETCH_NONCONFORMANCETYPE',
  CREATE_NONCONFORMANCETYPE: 'nonConformanceType/CREATE_NONCONFORMANCETYPE',
  UPDATE_NONCONFORMANCETYPE: 'nonConformanceType/UPDATE_NONCONFORMANCETYPE',
  DELETE_NONCONFORMANCETYPE: 'nonConformanceType/DELETE_NONCONFORMANCETYPE',
  RESET: 'nonConformanceType/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INonConformanceType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NonConformanceTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: NonConformanceTypeState = initialState, action): NonConformanceTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NONCONFORMANCETYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NONCONFORMANCETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NONCONFORMANCETYPE):
    case REQUEST(ACTION_TYPES.UPDATE_NONCONFORMANCETYPE):
    case REQUEST(ACTION_TYPES.DELETE_NONCONFORMANCETYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NONCONFORMANCETYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NONCONFORMANCETYPE):
    case FAILURE(ACTION_TYPES.CREATE_NONCONFORMANCETYPE):
    case FAILURE(ACTION_TYPES.UPDATE_NONCONFORMANCETYPE):
    case FAILURE(ACTION_TYPES.DELETE_NONCONFORMANCETYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NONCONFORMANCETYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NONCONFORMANCETYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NONCONFORMANCETYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_NONCONFORMANCETYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NONCONFORMANCETYPE):
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

const apiUrl = 'api/non-conformance-types';

// Actions

export const getEntities: ICrudGetAllAction<INonConformanceType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NONCONFORMANCETYPE_LIST,
  payload: axios.get<INonConformanceType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<INonConformanceType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_NONCONFORMANCETYPE,
    payload: axios.get<INonConformanceType>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<INonConformanceType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NONCONFORMANCETYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<INonConformanceType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NONCONFORMANCETYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<INonConformanceType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NONCONFORMANCETYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
