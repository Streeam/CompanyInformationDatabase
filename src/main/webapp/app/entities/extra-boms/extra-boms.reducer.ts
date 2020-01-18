import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExtraBoms, defaultValue } from 'app/shared/model/extra-boms.model';

export const ACTION_TYPES = {
  FETCH_EXTRABOMS_LIST: 'extraBoms/FETCH_EXTRABOMS_LIST',
  FETCH_EXTRABOMS: 'extraBoms/FETCH_EXTRABOMS',
  CREATE_EXTRABOMS: 'extraBoms/CREATE_EXTRABOMS',
  UPDATE_EXTRABOMS: 'extraBoms/UPDATE_EXTRABOMS',
  DELETE_EXTRABOMS: 'extraBoms/DELETE_EXTRABOMS',
  RESET: 'extraBoms/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExtraBoms>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ExtraBomsState = Readonly<typeof initialState>;

// Reducer

export default (state: ExtraBomsState = initialState, action): ExtraBomsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXTRABOMS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXTRABOMS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXTRABOMS):
    case REQUEST(ACTION_TYPES.UPDATE_EXTRABOMS):
    case REQUEST(ACTION_TYPES.DELETE_EXTRABOMS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXTRABOMS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXTRABOMS):
    case FAILURE(ACTION_TYPES.CREATE_EXTRABOMS):
    case FAILURE(ACTION_TYPES.UPDATE_EXTRABOMS):
    case FAILURE(ACTION_TYPES.DELETE_EXTRABOMS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXTRABOMS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXTRABOMS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXTRABOMS):
    case SUCCESS(ACTION_TYPES.UPDATE_EXTRABOMS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXTRABOMS):
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

const apiUrl = 'api/extra-boms';

// Actions

export const getEntities: ICrudGetAllAction<IExtraBoms> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXTRABOMS_LIST,
  payload: axios.get<IExtraBoms>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IExtraBoms> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXTRABOMS,
    payload: axios.get<IExtraBoms>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExtraBoms> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXTRABOMS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExtraBoms> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXTRABOMS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExtraBoms> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXTRABOMS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
