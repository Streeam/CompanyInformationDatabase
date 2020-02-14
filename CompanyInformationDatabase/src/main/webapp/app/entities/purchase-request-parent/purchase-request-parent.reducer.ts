import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPurchaseRequestParent, defaultValue } from 'app/shared/model/purchase-request-parent.model';

export const ACTION_TYPES = {
  FETCH_PURCHASEREQUESTPARENT_LIST: 'purchaseRequestParent/FETCH_PURCHASEREQUESTPARENT_LIST',
  FETCH_PURCHASEREQUESTPARENT: 'purchaseRequestParent/FETCH_PURCHASEREQUESTPARENT',
  CREATE_PURCHASEREQUESTPARENT: 'purchaseRequestParent/CREATE_PURCHASEREQUESTPARENT',
  UPDATE_PURCHASEREQUESTPARENT: 'purchaseRequestParent/UPDATE_PURCHASEREQUESTPARENT',
  DELETE_PURCHASEREQUESTPARENT: 'purchaseRequestParent/DELETE_PURCHASEREQUESTPARENT',
  RESET: 'purchaseRequestParent/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPurchaseRequestParent>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type PurchaseRequestParentState = Readonly<typeof initialState>;

// Reducer

export default (state: PurchaseRequestParentState = initialState, action): PurchaseRequestParentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PURCHASEREQUESTPARENT):
    case REQUEST(ACTION_TYPES.UPDATE_PURCHASEREQUESTPARENT):
    case REQUEST(ACTION_TYPES.DELETE_PURCHASEREQUESTPARENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT):
    case FAILURE(ACTION_TYPES.CREATE_PURCHASEREQUESTPARENT):
    case FAILURE(ACTION_TYPES.UPDATE_PURCHASEREQUESTPARENT):
    case FAILURE(ACTION_TYPES.DELETE_PURCHASEREQUESTPARENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PURCHASEREQUESTPARENT):
    case SUCCESS(ACTION_TYPES.UPDATE_PURCHASEREQUESTPARENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PURCHASEREQUESTPARENT):
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

const apiUrl = 'api/purchase-request-parents';

// Actions

export const getEntities: ICrudGetAllAction<IPurchaseRequestParent> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT_LIST,
    payload: axios.get<IPurchaseRequestParent>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IPurchaseRequestParent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PURCHASEREQUESTPARENT,
    payload: axios.get<IPurchaseRequestParent>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPurchaseRequestParent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PURCHASEREQUESTPARENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPurchaseRequestParent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PURCHASEREQUESTPARENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPurchaseRequestParent> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PURCHASEREQUESTPARENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
