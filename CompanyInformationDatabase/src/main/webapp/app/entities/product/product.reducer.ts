import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction, Storage } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { IProduct, defaultValue } from 'app/shared/model/product.model';
import { reset as bomReset } from '../bom/bom.reducer';
import { reset as RoutingReset } from '../routing/routing.reducer';
import Dexie from 'dexie';
import { ProductDatabase } from '../../modules/company-data/products/import-csv-products/ProductDatabase';

export const ACTION_TYPES = {
  FETCH_PRODUCT_LIST: 'product/FETCH_PRODUCT_LIST',
  FETCH_PRODUCT_BOM_LIST: 'product/FETCH_PRODUCT_BOM_LIST',
  FETCH_PRODUCT: 'product/FETCH_PRODUCT',
  CREATE_PRODUCT: 'product/CREATE_PRODUCT',
  UPDATE_PRODUCT: 'product/UPDATE_PRODUCT',
  DELETE_PRODUCT: 'product/DELETE_PRODUCT',
  RESET: 'product/RESET',
  PRODUCT_BATCH: 'product/PRODUCT_BATCH'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProduct>,
  bomEntities: [] as ReadonlyArray<IProduct>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type ProductState = Readonly<typeof initialState>;

// Reducer

export default (state: ProductState = initialState, action): ProductState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT_BOM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PRODUCT):
    case REQUEST(ACTION_TYPES.UPDATE_PRODUCT):
    case REQUEST(ACTION_TYPES.DELETE_PRODUCT):
    case REQUEST(ACTION_TYPES.PRODUCT_BATCH):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT_BOM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRODUCT):
    case FAILURE(ACTION_TYPES.CREATE_PRODUCT):
    case FAILURE(ACTION_TYPES.UPDATE_PRODUCT):
    case FAILURE(ACTION_TYPES.DELETE_PRODUCT):
    case FAILURE(ACTION_TYPES.PRODUCT_BATCH):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: action.payload.headers ? parseInt(action.payload.headers['x-total-count'], 10) : action.payload.data.lenght
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT_BOM_LIST):
      return {
        ...state,
        loading: false,
        bomEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRODUCT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRODUCT):
    case SUCCESS(ACTION_TYPES.UPDATE_PRODUCT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.PRODUCT_BATCH):
    case SUCCESS(ACTION_TYPES.DELETE_PRODUCT):
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

const apiUrl = 'api/products';

// Actions

export const getProductsByPage: ICrudGetAllAction<IProduct> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_LIST,
    payload: axios.get<IProduct>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

/*export const getAllEntities = () => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
}; */

export const getAllProductsFromDB = () => async (dispatch, getState) => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;

  /*   const db = new ProductDatabase();
  // console.time('products');
  const products = await db.productData.get('products');
  // console.timeEnd('products');
  if (products) {
    db.close();
    return dispatch({
      type: ACTION_TYPES.FETCH_PRODUCT_LIST,
      payload: new Promise((resolve, reject) => {
        resolve({ data: products.products, status: 200, statusText: 'OK' });
      })
    });
  } else {
    const result = await dispatch({
      type: ACTION_TYPES.FETCH_PRODUCT_LIST,
      payload: axios.get<IProduct>(requestUrl)
    });

    await db.productData.add({ id: 'products', products: result.value.data });
    db.close();
    return result;
  } */

  const result = await dispatch({
    type: ACTION_TYPES.FETCH_PRODUCT_LIST,
    payload: axios.get<IProduct>(requestUrl)
  });
  return result;
};

export const getAllProductBoms = id => {
  const requestUrl = `${apiUrl}/boms/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT_BOM_LIST,
    payload: axios.get<IProduct>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IProduct> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRODUCT,
    payload: axios.get<IProduct>(requestUrl)
  };
};
export const refreshProductsAndReselectCurrentProduct = (product: IProduct, selectProductAfterUpdate: Function) => async (
  dispatch,
  getState
) => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_PRODUCT_LIST,
    payload: axios.get<IProduct>(requestUrl)
  });
  const products: IProduct[] = getState().product.entities;
  const productsToSelect = products.filter(item => item.id === product.id);
  productsToSelect.length > 0 && selectProductAfterUpdate(productsToSelect[0]);
  return result;
};
export const createEntity: ICrudPutAction<IProduct> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRODUCT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getAllProductsFromDB());
  return result;
};

export const updateEntity = (entity: IProduct, selectProductAfterUpdate?: Function) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRODUCT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  selectProductAfterUpdate && dispatch(refreshProductsAndReselectCurrentProduct(entity, selectProductAfterUpdate));
  return result;
};
export const updateEntities = listOfListProducts => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PRODUCT_BATCH,
    payload: axios.put(apiUrl + `/update-batches`, listOfListProducts)
  });
  return result;
};
export const createEntities = listOfListProducts => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PRODUCT_BATCH,
    payload: axios.post(apiUrl + `/batches`, listOfListProducts)
  });
  return result;
};
export const deleteEntity: ICrudDeleteAction<IProduct> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRODUCT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getAllProductsFromDB());
  // dispatch(bomReset());
  // dispatch(RoutingReset());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
