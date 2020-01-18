import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IInternalNonConformance, defaultValue } from 'app/shared/model/internal-non-conformance.model';

export const ACTION_TYPES = {
  FETCH_INTERNALNONCONFORMANCE_LIST: 'internalNonConformance/FETCH_INTERNALNONCONFORMANCE_LIST',
  FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST:
    'internalNonConformance/FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST',
  FETCH_INTERNALNONCONFORMANCE: 'internalNonConformance/FETCH_INTERNALNONCONFORMANCE',
  FETCH_INCOMPLETE_INTERNALNONCONFORMANCE: 'internalNonConformance/FETCH_INCOMPLETE_INTERNALNONCONFORMANCE',
  CREATE_INTERNALNONCONFORMANCE: 'internalNonConformance/CREATE_INTERNALNONCONFORMANCE',
  UPDATE_INTERNALNONCONFORMANCE: 'internalNonConformance/UPDATE_INTERNALNONCONFORMANCE',
  DELETE_INTERNALNONCONFORMANCE: 'internalNonConformance/DELETE_INTERNALNONCONFORMANCE',
  RESET: 'internalNonConformance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IInternalNonConformance>,
  entitiesOfNoconformanceDetails: [] as ReadonlyArray<IInternalNonConformance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type InternalNonConformanceState = Readonly<typeof initialState>;

// Reducer

export default (state: InternalNonConformanceState = initialState, action): InternalNonConformanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.FETCH_INCOMPLETE_INTERNALNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_INTERNALNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.UPDATE_INTERNALNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.DELETE_INTERNALNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.FETCH_INCOMPLETE_INTERNALNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.CREATE_INTERNALNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.UPDATE_INTERNALNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.DELETE_INTERNALNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
      return {
        ...state,
        loading: false,
        entitiesOfNoconformanceDetails: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.FETCH_INCOMPLETE_INTERNALNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_INTERNALNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_INTERNALNONCONFORMANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_INTERNALNONCONFORMANCE):
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

const apiUrl = 'api/internal-non-conformances';

// Actions

export const getEntities: ICrudGetAllAction<IInternalNonConformance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_LIST,
  payload: axios.get<IInternalNonConformance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IInternalNonConformance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE,
    payload: axios.get<IInternalNonConformance>(requestUrl)
  };
};

export const getInternalNonConformances: ICrudGetAction<IInternalNonConformance> = nonconformanceDetailsid => {
  const requestUrl = `${apiUrl}/non-conformance-details/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_INTERNALNONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST,
    payload: axios.get<IInternalNonConformance>(requestUrl)
  };
};
export const getIncompleteInternalNonConformance: ICrudGetAction<IInternalNonConformance> = nonconformanceDetailsid => {
  const requestUrl = `${apiUrl}/incomplete-non-conformance-details/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_INCOMPLETE_INTERNALNONCONFORMANCE,
    payload: axios.get<IInternalNonConformance>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IInternalNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_INTERNALNONCONFORMANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IInternalNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_INTERNALNONCONFORMANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IInternalNonConformance> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_INTERNALNONCONFORMANCE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
