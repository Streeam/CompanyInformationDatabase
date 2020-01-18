import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRouting, defaultValue } from 'app/shared/model/routing.model';

export const ACTION_TYPES = {
  FETCH_ROUTING_LIST: 'routing/FETCH_ROUTING_LIST',
  FETCH_ROUTING: 'routing/FETCH_ROUTING',
  CREATE_ROUTING: 'routing/CREATE_ROUTING',
  UPDATE_ROUTING: 'routing/UPDATE_ROUTING',
  DELETE_ROUTING: 'routing/DELETE_ROUTING',
  RESET: 'routing/RESET',
  ROUTING_BATCH: 'product/ROUTING_BATCH'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRouting>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type RoutingState = Readonly<typeof initialState>;

// Reducer

export default (state: RoutingState = initialState, action): RoutingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROUTING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROUTING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ROUTING):
    case REQUEST(ACTION_TYPES.UPDATE_ROUTING):
    case REQUEST(ACTION_TYPES.DELETE_ROUTING):
    case REQUEST(ACTION_TYPES.ROUTING_BATCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ROUTING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROUTING):
    case FAILURE(ACTION_TYPES.CREATE_ROUTING):
    case FAILURE(ACTION_TYPES.UPDATE_ROUTING):
    case FAILURE(ACTION_TYPES.DELETE_ROUTING):
    case FAILURE(ACTION_TYPES.ROUTING_BATCH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROUTING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROUTING):
    case SUCCESS(ACTION_TYPES.UPDATE_ROUTING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROUTING):
    case SUCCESS(ACTION_TYPES.ROUTING_BATCH):
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

const apiUrl = 'api/routings';

// Actions

export const getEntities: ICrudGetAllAction<IRouting> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ROUTING_LIST,
  payload: axios.get<IRouting>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IRouting> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTING,
    payload: axios.get<IRouting>(requestUrl)
  };
};

export const getAllEntities: ICrudGetAllAction<IRouting> = () => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTING_LIST,
    payload: axios.get<IRouting>(requestUrl)
  };
};
export const getParentsRoutings = (productId: number) => {
  const requestUrl = `${apiUrl}/product/${productId}`;
  return {
    type: ACTION_TYPES.FETCH_ROUTING_LIST,
    payload: axios.get<IRouting>(requestUrl)
  };
};
export const createEntity: ICrudPutAction<IRouting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROUTING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const createRoutingAndRefreshParent = (entity: IRouting, parentId: number) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROUTING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getParentsRoutings(parentId));
  return result;
};
export const createEntities = listOfListRoutings => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.ROUTING_BATCH,
    payload: axios.post(apiUrl + `/batches`, listOfListRoutings)
  });
  return result;
};

export const updateEntity: ICrudPutAction<IRouting> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROUTING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const updateRoutingAndRefreshParent = (entity: IRouting, parentId: number) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROUTING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getParentsRoutings(parentId));
  return result;
};
export const deleteEntity: ICrudDeleteAction<IRouting> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROUTING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
export const deleteRoutingAndRefreshParent = (id: number, parentId: number) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROUTING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getParentsRoutings(parentId));
  return result;
};
export const reset = () => ({
  type: ACTION_TYPES.RESET
});
