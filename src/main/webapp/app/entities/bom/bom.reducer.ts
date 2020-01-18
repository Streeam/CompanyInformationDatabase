import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IBom, defaultValue } from 'app/shared/model/bom.model';
import { IProduct } from 'app/shared/model/product.model';

export const ACTION_TYPES = {
  FETCH_BOM_LIST: 'bom/FETCH_BOM_LIST',
  FETCH_BOM: 'bom/FETCH_BOM',
  CREATE_BOM: 'bom/CREATE_BOM',
  UPDATE_BOM: 'bom/UPDATE_BOM',
  DELETE_BOM: 'bom/DELETE_BOM',
  BOMS_BATCH: 'bom/BOMS_BATCH',
  RESET: 'bom/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBom>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type BomState = Readonly<typeof initialState>;

// Reducer

export default (state: BomState = initialState, action): BomState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_BOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BOM):
    case REQUEST(ACTION_TYPES.UPDATE_BOM):
    case REQUEST(ACTION_TYPES.DELETE_BOM):
    case REQUEST(ACTION_TYPES.BOMS_BATCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_BOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOM):
    case FAILURE(ACTION_TYPES.CREATE_BOM):
    case FAILURE(ACTION_TYPES.UPDATE_BOM):
    case FAILURE(ACTION_TYPES.DELETE_BOM):
    case FAILURE(ACTION_TYPES.BOMS_BATCH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOM_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOM):
    case SUCCESS(ACTION_TYPES.UPDATE_BOM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOM):
    case SUCCESS(ACTION_TYPES.BOMS_BATCH):
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

const apiUrl = 'api/boms';

// Actions

export const getEntities: ICrudGetAllAction<IBom> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOM_LIST,
  payload: axios.get<IBom>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getAllEntities: ICrudGetAllAction<IBom> = () => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;
  return {
    type: ACTION_TYPES.FETCH_BOM_LIST,
    payload: axios.get<IBom>(requestUrl)
  };
};

export const getParentsBoms = (productId: number) => {
  const requestUrl = `${apiUrl}/product/${productId}`;
  return {
    type: ACTION_TYPES.FETCH_BOM_LIST,
    payload: axios.get<IBom>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IBom> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOM,
    payload: axios.get<IBom>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IBom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};
export const createBomAndRefreshParent = (entity: IBom, parentId: number) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getParentsBoms(parentId));
  return result;
};
export const createEntities = listOfListBoms => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.BOMS_BATCH,
    payload: axios.post(apiUrl + `/batches`, listOfListBoms)
  });
  return result;
};

export const updateEntity: ICrudPutAction<IBom> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  // dispatch(getEntities());
  return result;
};
export const updateBomAndRefreshParent = (entity: IBom, parentId: number) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getParentsBoms(parentId));
  return result;
};
export const deleteEntity: ICrudDeleteAction<IBom> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};
export const deleteBomAndRefreshParent = (id: number, parent: IProduct, selectProductAfterUpdate: Function) => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getParentsBoms(parent.id));
  // dispatch(refreshProductsAndReselectCurrentProduct(parent, selectProductAfterUpdate));
  return result;
};
export const reset = () => ({
  type: ACTION_TYPES.RESET
});
