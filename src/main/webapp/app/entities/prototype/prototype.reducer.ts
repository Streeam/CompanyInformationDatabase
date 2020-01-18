import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrototype, defaultValue } from 'app/shared/model/prototype.model';

export const ACTION_TYPES = {
  FETCH_PROTOTYPE_LIST: 'prototype/FETCH_PROTOTYPE_LIST',
  FETCH_PROTOTYPE: 'prototype/FETCH_PROTOTYPE',
  CREATE_PROTOTYPE: 'prototype/CREATE_PROTOTYPE',
  UPDATE_PROTOTYPE: 'prototype/UPDATE_PROTOTYPE',
  DELETE_PROTOTYPE: 'prototype/DELETE_PROTOTYPE',
  RESET: 'prototype/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrototype>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PrototypeState = Readonly<typeof initialState>;

// Reducer

export default (state: PrototypeState = initialState, action): PrototypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROTOTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROTOTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROTOTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_PROTOTYPE):
    case REQUEST(ACTION_TYPES.DELETE_PROTOTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROTOTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROTOTYPE):
    case FAILURE(ACTION_TYPES.CREATE_PROTOTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_PROTOTYPE):
    case FAILURE(ACTION_TYPES.DELETE_PROTOTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROTOTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROTOTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_PROTOTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROTOTYPE):
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

const apiUrl = 'api/prototypes';

// Actions

export const getEntities: ICrudGetAllAction<IPrototype> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROTOTYPE_LIST,
  payload: axios.get<IPrototype>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPrototype> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROTOTYPE,
    payload: axios.get<IPrototype>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPrototype> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROTOTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrototype> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROTOTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrototype> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROTOTYPE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
