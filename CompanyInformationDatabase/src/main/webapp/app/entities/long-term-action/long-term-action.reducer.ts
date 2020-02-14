import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ILongTermAction, defaultValue } from 'app/shared/model/long-term-action.model';

export const ACTION_TYPES = {
  FETCH_LONGTERMACTION_LIST: 'longTermAction/FETCH_LONGTERMACTION_LIST',
  FETCH_LONGTERMACTION: 'longTermAction/FETCH_LONGTERMACTION',
  CREATE_LONGTERMACTION: 'longTermAction/CREATE_LONGTERMACTION',
  UPDATE_LONGTERMACTION: 'longTermAction/UPDATE_LONGTERMACTION',
  DELETE_LONGTERMACTION: 'longTermAction/DELETE_LONGTERMACTION',
  RESET: 'longTermAction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ILongTermAction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type LongTermActionState = Readonly<typeof initialState>;

// Reducer

export default (state: LongTermActionState = initialState, action): LongTermActionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_LONGTERMACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_LONGTERMACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_LONGTERMACTION):
    case REQUEST(ACTION_TYPES.UPDATE_LONGTERMACTION):
    case REQUEST(ACTION_TYPES.DELETE_LONGTERMACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_LONGTERMACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_LONGTERMACTION):
    case FAILURE(ACTION_TYPES.CREATE_LONGTERMACTION):
    case FAILURE(ACTION_TYPES.UPDATE_LONGTERMACTION):
    case FAILURE(ACTION_TYPES.DELETE_LONGTERMACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_LONGTERMACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_LONGTERMACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_LONGTERMACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_LONGTERMACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_LONGTERMACTION):
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

const apiUrl = 'api/long-term-actions';

// Actions

export const getEntities: ICrudGetAllAction<ILongTermAction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_LONGTERMACTION_LIST,
  payload: axios.get<ILongTermAction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ILongTermAction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_LONGTERMACTION,
    payload: axios.get<ILongTermAction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ILongTermAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_LONGTERMACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ILongTermAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_LONGTERMACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ILongTermAction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_LONGTERMACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
