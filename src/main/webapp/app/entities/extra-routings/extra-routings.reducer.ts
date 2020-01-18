import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IExtraRoutings, defaultValue } from 'app/shared/model/extra-routings.model';

export const ACTION_TYPES = {
  FETCH_EXTRAROUTINGS_LIST: 'extraRoutings/FETCH_EXTRAROUTINGS_LIST',
  FETCH_EXTRAROUTINGS: 'extraRoutings/FETCH_EXTRAROUTINGS',
  CREATE_EXTRAROUTINGS: 'extraRoutings/CREATE_EXTRAROUTINGS',
  UPDATE_EXTRAROUTINGS: 'extraRoutings/UPDATE_EXTRAROUTINGS',
  DELETE_EXTRAROUTINGS: 'extraRoutings/DELETE_EXTRAROUTINGS',
  RESET: 'extraRoutings/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IExtraRoutings>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ExtraRoutingsState = Readonly<typeof initialState>;

// Reducer

export default (state: ExtraRoutingsState = initialState, action): ExtraRoutingsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EXTRAROUTINGS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EXTRAROUTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EXTRAROUTINGS):
    case REQUEST(ACTION_TYPES.UPDATE_EXTRAROUTINGS):
    case REQUEST(ACTION_TYPES.DELETE_EXTRAROUTINGS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EXTRAROUTINGS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EXTRAROUTINGS):
    case FAILURE(ACTION_TYPES.CREATE_EXTRAROUTINGS):
    case FAILURE(ACTION_TYPES.UPDATE_EXTRAROUTINGS):
    case FAILURE(ACTION_TYPES.DELETE_EXTRAROUTINGS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXTRAROUTINGS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_EXTRAROUTINGS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EXTRAROUTINGS):
    case SUCCESS(ACTION_TYPES.UPDATE_EXTRAROUTINGS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EXTRAROUTINGS):
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

const apiUrl = 'api/extra-routings';

// Actions

export const getEntities: ICrudGetAllAction<IExtraRoutings> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_EXTRAROUTINGS_LIST,
  payload: axios.get<IExtraRoutings>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IExtraRoutings> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EXTRAROUTINGS,
    payload: axios.get<IExtraRoutings>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IExtraRoutings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EXTRAROUTINGS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IExtraRoutings> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EXTRAROUTINGS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IExtraRoutings> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EXTRAROUTINGS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
