import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISalesOrder, defaultValue } from 'app/shared/model/sales-order.model';

export const ACTION_TYPES = {
  FETCH_SALESORDER_LIST: 'salesOrder/FETCH_SALESORDER_LIST',
  FETCH_SALESORDER: 'salesOrder/FETCH_SALESORDER',
  CREATE_SALESORDER: 'salesOrder/CREATE_SALESORDER',
  UPDATE_SALESORDER: 'salesOrder/UPDATE_SALESORDER',
  DELETE_SALESORDER: 'salesOrder/DELETE_SALESORDER',
  RESET: 'salesOrder/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISalesOrder>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type SalesOrderState = Readonly<typeof initialState>;

// Reducer

export default (state: SalesOrderState = initialState, action): SalesOrderState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SALESORDER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SALESORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_SALESORDER):
    case REQUEST(ACTION_TYPES.UPDATE_SALESORDER):
    case REQUEST(ACTION_TYPES.DELETE_SALESORDER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_SALESORDER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SALESORDER):
    case FAILURE(ACTION_TYPES.CREATE_SALESORDER):
    case FAILURE(ACTION_TYPES.UPDATE_SALESORDER):
    case FAILURE(ACTION_TYPES.DELETE_SALESORDER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALESORDER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_SALESORDER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_SALESORDER):
    case SUCCESS(ACTION_TYPES.UPDATE_SALESORDER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_SALESORDER):
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

const apiUrl = 'api/sales-orders';

// Actions

export const getEntities: ICrudGetAllAction<ISalesOrder> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_SALESORDER_LIST,
    payload: axios.get<ISalesOrder>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<ISalesOrder> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SALESORDER,
    payload: axios.get<ISalesOrder>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ISalesOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SALESORDER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISalesOrder> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SALESORDER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISalesOrder> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SALESORDER,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
