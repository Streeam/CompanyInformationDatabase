import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IShortTermAction, defaultValue } from 'app/shared/model/short-term-action.model';

export const ACTION_TYPES = {
  FETCH_SHORTTERMACTION_LIST: 'shortTermAction/FETCH_SHORTTERMACTION_LIST',
  FETCH_SHORTTERMACTION: 'shortTermAction/FETCH_SHORTTERMACTION',
  CREATE_SHORTTERMACTION: 'shortTermAction/CREATE_SHORTTERMACTION',
  UPDATE_SHORTTERMACTION: 'shortTermAction/UPDATE_SHORTTERMACTION',
  DELETE_SHORTTERMACTION: 'shortTermAction/DELETE_SHORTTERMACTION',
  RESET: 'shortTermAction/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IShortTermAction>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ShortTermActionState = Readonly<typeof initialState>;

// Reducer

export default (state: ShortTermActionState = initialState, action): ShortTermActionState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SHORTTERMACTION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SHORTTERMACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SHORTTERMACTION):
    case REQUEST(ACTION_TYPES.UPDATE_SHORTTERMACTION):
    case REQUEST(ACTION_TYPES.DELETE_SHORTTERMACTION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SHORTTERMACTION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SHORTTERMACTION):
    case FAILURE(ACTION_TYPES.CREATE_SHORTTERMACTION):
    case FAILURE(ACTION_TYPES.UPDATE_SHORTTERMACTION):
    case FAILURE(ACTION_TYPES.DELETE_SHORTTERMACTION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHORTTERMACTION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_SHORTTERMACTION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SHORTTERMACTION):
    case SUCCESS(ACTION_TYPES.UPDATE_SHORTTERMACTION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SHORTTERMACTION):
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

const apiUrl = 'api/short-term-actions';

// Actions

export const getEntities: ICrudGetAllAction<IShortTermAction> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SHORTTERMACTION_LIST,
  payload: axios.get<IShortTermAction>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IShortTermAction> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SHORTTERMACTION,
    payload: axios.get<IShortTermAction>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IShortTermAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SHORTTERMACTION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IShortTermAction> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SHORTTERMACTION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IShortTermAction> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SHORTTERMACTION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
