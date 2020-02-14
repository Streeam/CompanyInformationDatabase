import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAfterSaleExpenses, defaultValue } from 'app/shared/model/after-sale-expenses.model';

export const ACTION_TYPES = {
  FETCH_AFTERSALEEXPENSES_LIST: 'afterSaleExpenses/FETCH_AFTERSALEEXPENSES_LIST',
  FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST: 'afterSaleExpenses/FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST',
  FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST: 'afterSaleExpenses/FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST',
  FETCH_AFTERSALEEXPENSES: 'afterSaleExpenses/FETCH_AFTERSALEEXPENSES',
  CREATE_AFTERSALEEXPENSES: 'afterSaleExpenses/CREATE_AFTERSALEEXPENSES',
  UPDATE_AFTERSALEEXPENSES: 'afterSaleExpenses/UPDATE_AFTERSALEEXPENSES',
  DELETE_AFTERSALEEXPENSES: 'afterSaleExpenses/DELETE_AFTERSALEEXPENSES',
  RESET: 'afterSaleExpenses/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAfterSaleExpenses>,
  allAfterSalesExpensesByNonConformace: [] as ReadonlyArray<IAfterSaleExpenses>,
  allAfterSalesExpensesByCustomerNonConformace: [] as ReadonlyArray<IAfterSaleExpenses>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AfterSaleExpensesState = Readonly<typeof initialState>;

// Reducer

export default (state: AfterSaleExpensesState = initialState, action): AfterSaleExpensesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AFTERSALEEXPENSES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AFTERSALEEXPENSES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AFTERSALEEXPENSES):
    case REQUEST(ACTION_TYPES.UPDATE_AFTERSALEEXPENSES):
    case REQUEST(ACTION_TYPES.DELETE_AFTERSALEEXPENSES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AFTERSALEEXPENSES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AFTERSALEEXPENSES):
    case FAILURE(ACTION_TYPES.CREATE_AFTERSALEEXPENSES):
    case FAILURE(ACTION_TYPES.UPDATE_AFTERSALEEXPENSES):
    case FAILURE(ACTION_TYPES.DELETE_AFTERSALEEXPENSES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFTERSALEEXPENSES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST):
      return {
        ...state,
        loading: false,
        allAfterSalesExpensesByNonConformace: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST):
      return {
        ...state,
        loading: false,
        allAfterSalesExpensesByCustomerNonConformace: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AFTERSALEEXPENSES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AFTERSALEEXPENSES):
    case SUCCESS(ACTION_TYPES.UPDATE_AFTERSALEEXPENSES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AFTERSALEEXPENSES):
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

const apiUrl = 'api/after-sale-expenses';

// Actions

export const getEntities: ICrudGetAllAction<IAfterSaleExpenses> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AFTERSALEEXPENSES_LIST,
  payload: axios.get<IAfterSaleExpenses>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAfterSaleExpenses> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AFTERSALEEXPENSES,
    payload: axios.get<IAfterSaleExpenses>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAfterSaleExpenses> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AFTERSALEEXPENSES,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  entity.customerNonConformanceId && dispatch(getAllAfterSalesCostsByCustomerNonConformaceId(entity.customerNonConformanceId));
  return result;
};

export const updateEntity: ICrudPutAction<IAfterSaleExpenses> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AFTERSALEEXPENSES,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  entity.customerNonConformanceId && dispatch(getAllAfterSalesCostsByCustomerNonConformaceId(entity.customerNonConformanceId));
  return result;
};
export const getAllAfterSalesCostsByNonConformaceId: ICrudGetAction<IAfterSaleExpenses> = nonconformanceDetailsid => {
  const requestUrl = `${apiUrl}/non-conformance-details/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_AFTER_SALES_BY_NONCONFORMANCE_DETAILS_LIST,
    payload: axios.get<IAfterSaleExpenses>(requestUrl)
  };
};
export const getAllAfterSalesCostsByCustomerNonConformaceId: ICrudGetAction<IAfterSaleExpenses> = customerNonConformanceId => {
  const requestUrl = `${apiUrl}/non-conformance-customer/${customerNonConformanceId}`;
  return {
    type: ACTION_TYPES.FETCH_AFTER_SALES_BY_CUSTOMER_NONCONFORMANCE_DETAILS_LIST,
    payload: axios.get<IAfterSaleExpenses>(requestUrl)
  };
};
export const deleteEntity = (entity: IAfterSaleExpenses) => async dispatch => {
  const requestUrl = `${apiUrl}/${entity.id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AFTERSALEEXPENSES,
    payload: axios.delete(requestUrl)
  });
  entity.customerNonConformanceId && dispatch(getAllAfterSalesCostsByCustomerNonConformaceId(entity.customerNonConformanceId));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
