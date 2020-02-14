import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPurchaseRequestChild, defaultValue } from 'app/shared/model/purchase-request-child.model';

export const ACTION_TYPES = {
  FETCH_PURCHASEREQUESTCHILD_LIST: 'purchaseRequestChild/FETCH_PURCHASEREQUESTCHILD_LIST',
  FETCH_PURCHASEREQUESTCHILD: 'purchaseRequestChild/FETCH_PURCHASEREQUESTCHILD',
  CREATE_PURCHASEREQUESTCHILD: 'purchaseRequestChild/CREATE_PURCHASEREQUESTCHILD',
  UPDATE_PURCHASEREQUESTCHILD: 'purchaseRequestChild/UPDATE_PURCHASEREQUESTCHILD',
  DELETE_PURCHASEREQUESTCHILD: 'purchaseRequestChild/DELETE_PURCHASEREQUESTCHILD',
  RESET: 'purchaseRequestChild/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPurchaseRequestChild>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type PurchaseRequestChildState = Readonly<typeof initialState>;

// Reducer

export default (state: PurchaseRequestChildState = initialState, action): PurchaseRequestChildState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PURCHASEREQUESTCHILD):
    case REQUEST(ACTION_TYPES.UPDATE_PURCHASEREQUESTCHILD):
    case REQUEST(ACTION_TYPES.DELETE_PURCHASEREQUESTCHILD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD):
    case FAILURE(ACTION_TYPES.CREATE_PURCHASEREQUESTCHILD):
    case FAILURE(ACTION_TYPES.UPDATE_PURCHASEREQUESTCHILD):
    case FAILURE(ACTION_TYPES.DELETE_PURCHASEREQUESTCHILD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PURCHASEREQUESTCHILD):
    case SUCCESS(ACTION_TYPES.UPDATE_PURCHASEREQUESTCHILD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PURCHASEREQUESTCHILD):
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

const apiUrl = 'api/purchase-request-children';

// Actions

export const getEntities: ICrudGetAllAction<IPurchaseRequestChild> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD_LIST,
  payload: axios.get<IPurchaseRequestChild>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IPurchaseRequestChild> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PURCHASEREQUESTCHILD,
    payload: axios.get<IPurchaseRequestChild>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IPurchaseRequestChild> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PURCHASEREQUESTCHILD,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPurchaseRequestChild> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PURCHASEREQUESTCHILD,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPurchaseRequestChild> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PURCHASEREQUESTCHILD,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
