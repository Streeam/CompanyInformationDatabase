import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IClientNonConformance, defaultValue } from 'app/shared/model/client-non-conformance.model';
import { getAllAfterSalesCostsByCustomerNonConformaceId } from '../after-sale-expenses/after-sale-expenses.reducer';

export const ACTION_TYPES = {
  FETCH_CLIENTNONCONFORMANCE_LIST: 'clientNonConformance/FETCH_CLIENTNONCONFORMANCE_LIST',
  FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST:
    'clientNonConformance/FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST',
  FETCH_CLIENTNONCONFORMANCE: 'clientNonConformance/FETCH_CLIENTNONCONFORMANCE',
  FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE: 'clientNonConformance/FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE',
  CREATE_CLIENTNONCONFORMANCE: 'clientNonConformance/CREATE_CLIENTNONCONFORMANCE',
  UPDATE_CLIENTNONCONFORMANCE: 'clientNonConformance/UPDATE_CLIENTNONCONFORMANCE',
  DELETE_CLIENTNONCONFORMANCE: 'clientNonConformance/DELETE_CLIENTNONCONFORMANCE',
  RESET: 'clientNonConformance/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IClientNonConformance>,
  entitiesOfNoconformanceDetails: [] as ReadonlyArray<IClientNonConformance>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ClientNonConformanceState = Readonly<typeof initialState>;

// Reducer

export default (state: ClientNonConformanceState = initialState, action): ClientNonConformanceState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CLIENTNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.UPDATE_CLIENTNONCONFORMANCE):
    case REQUEST(ACTION_TYPES.DELETE_CLIENTNONCONFORMANCE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE):
    case FAILURE(ACTION_TYPES.CREATE_CLIENTNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.UPDATE_CLIENTNONCONFORMANCE):
    case FAILURE(ACTION_TYPES.DELETE_CLIENTNONCONFORMANCE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST):
      return {
        ...state,
        loading: false,
        entitiesOfNoconformanceDetails: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CLIENTNONCONFORMANCE):
    case SUCCESS(ACTION_TYPES.UPDATE_CLIENTNONCONFORMANCE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CLIENTNONCONFORMANCE):
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

const apiUrl = 'api/client-non-conformances';

// Actions

export const getEntities: ICrudGetAllAction<IClientNonConformance> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE_LIST,
  payload: axios.get<IClientNonConformance>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IClientNonConformance> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CLIENTNONCONFORMANCE,
    payload: axios.get<IClientNonConformance>(requestUrl)
  };
};
export const getCustomerNonConformances: ICrudGetAction<IClientNonConformance> = nonconformanceDetailsid => {
  const requestUrl = `${apiUrl}/non-conformance-details/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMER_NONCONFORMANCE_OF_NONCONFORMANCE_DETAILS_LIST,
    payload: axios.get<IClientNonConformance>(requestUrl)
  };
};
export const getIncompleteCustomerNonConformance: ICrudGetAction<IClientNonConformance> = nonconformanceDetailsid => {
  const requestUrl = `${apiUrl}/incomplete-non-conformance-details/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_INCOMPLETE_CUSTOMER_NONCONFORMANCE,
    payload: axios.get<IClientNonConformance>(requestUrl)
  };
};
export const createEntity = (entity: IClientNonConformance) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CLIENTNONCONFORMANCE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  const customerNonConformanceDetail: IClientNonConformance = getState().clientNonConformance.entity;
  if (customerNonConformanceDetail.id) {
    dispatch(getAllAfterSalesCostsByCustomerNonConformaceId(customerNonConformanceDetail.id));
  }
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IClientNonConformance> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CLIENTNONCONFORMANCE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity = (customerNonconformaceId: number, nonconformanceDetailsid?: number) => async dispatch => {
  const requestUrl = `${apiUrl}/${customerNonconformaceId}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CLIENTNONCONFORMANCE,
    payload: axios.delete(requestUrl)
  });
  nonconformanceDetailsid && dispatch(getCustomerNonConformances(nonconformanceDetailsid));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
