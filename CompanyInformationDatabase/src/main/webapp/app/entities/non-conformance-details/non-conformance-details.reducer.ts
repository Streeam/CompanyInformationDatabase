import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { INonConformanceDetails, defaultValue } from 'app/shared/model/non-conformance-details.model';
import { getInternalNonConformances } from '../internal-non-conformance/internal-non-conformance.reducer';
import { getCustomerNonConformances } from '../client-non-conformance/client-non-conformance.reducer';
import { getAllProductBoms } from '../product/product.reducer';
import { getEntities as getAllTasks } from '../task/task.reducer';
import { getProcessAuditOfNC } from '../process-audit-checklist/process-audit-checklist.reducer';
import { getNonConformaceRootCause } from '../action-to-be-taken/action-to-be-taken.reducer';

import { Status } from 'app/shared/model/enumerations/status.model';
import { IProcessAuditChecklist } from 'app/shared/model/process-audit-checklist.model';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { IActionToBeTaken } from 'app/shared/model/action-to-be-taken.model';

export const ACTION_TYPES = {
  FETCH_NONCONFORMANCEDETAILS_LIST: 'nonConformanceDetails/FETCH_NONCONFORMANCEDETAILS_LIST',
  FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST: 'nonConformanceDetails/FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST',
  FETCH_NONCONFORMANCEDETAILS: 'nonConformanceDetails/FETCH_NONCONFORMANCEDETAILS',
  CREATE_NONCONFORMANCEDETAILS: 'nonConformanceDetails/CREATE_NONCONFORMANCEDETAILS',
  UPDATE_NONCONFORMANCEDETAILS: 'nonConformanceDetails/UPDATE_NONCONFORMANCEDETAILS',
  DELETE_NONCONFORMANCEDETAILS: 'nonConformanceDetails/DELETE_NONCONFORMANCEDETAILS',
  RESET: 'nonConformanceDetails/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<INonConformanceDetails>,
  curentEntities: [] as ReadonlyArray<INonConformanceDetails>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type NonConformanceDetailsState = Readonly<typeof initialState>;

// Reducer

export default (state: NonConformanceDetailsState = initialState, action): NonConformanceDetailsState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST):
    case REQUEST(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_NONCONFORMANCEDETAILS):
    case REQUEST(ACTION_TYPES.UPDATE_NONCONFORMANCEDETAILS):
    case REQUEST(ACTION_TYPES.DELETE_NONCONFORMANCEDETAILS):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST):
    case FAILURE(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS):
    case FAILURE(ACTION_TYPES.CREATE_NONCONFORMANCEDETAILS):
    case FAILURE(ACTION_TYPES.UPDATE_NONCONFORMANCEDETAILS):
    case FAILURE(ACTION_TYPES.DELETE_NONCONFORMANCEDETAILS):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST):
      return {
        ...state,
        loading: false,
        curentEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_NONCONFORMANCEDETAILS):
    case SUCCESS(ACTION_TYPES.UPDATE_NONCONFORMANCEDETAILS):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_NONCONFORMANCEDETAILS):
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

const apiUrl = 'api/non-conformance-details';

// Actions

export const getEntities: ICrudGetAllAction<INonConformanceDetails> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS_LIST,
  payload: axios.get<INonConformanceDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getCurrentEntities: ICrudGetAllAction<INonConformanceDetails> = () => ({
  type: ACTION_TYPES.FETCH_CURRENT_NONCONFORMANCEDETAILS_LIST,
  payload: axios.get<INonConformanceDetails>(`${apiUrl}/current?cacheBuster=${new Date().getTime()}`)
});

export const refreshNCAndReselectCurrentNC = (nonConformance: INonConformanceDetails, selectEntity: Function) => async (
  dispatch,
  getState
) => {
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS_LIST,
    payload: axios.get<INonConformanceDetails>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
  });
  const nonConformanceDetails: INonConformanceDetails[] = getState().nonConformanceDetails.entities;
  const nonConformanceDetailToSelect = nonConformanceDetails.filter(item => item.id === nonConformance.id);
  nonConformanceDetailToSelect.length > 0 && selectEntity(nonConformanceDetailToSelect[0]);
  return result;
};

export const getEntity = id => async (dispatch, getState) => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS,
    payload: axios.get<INonConformanceDetails>(requestUrl)
  });
  const nonConformanceDetail: INonConformanceDetails = getState().nonConformanceDetails.entity;
  nonConformanceDetail && dispatch(getProcessAuditOfNC(nonConformanceDetail.id));
  nonConformanceDetail && dispatch(getNonConformaceRootCause(nonConformanceDetail.id));
  return result;
};

export const getCurrentIncomplete = () => async (dispatch, getState) => {
  const requestUrl = `${apiUrl}/current-incomplete`;
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS,
    payload: axios.get<INonConformanceDetails>(requestUrl)
  });
  const nonConformanceDetail: INonConformanceDetails = getState().nonConformanceDetails.entity;
  nonConformanceDetail && dispatch(getProcessAuditOfNC(nonConformanceDetail.id));
  nonConformanceDetail && dispatch(getNonConformaceRootCause(nonConformanceDetail.id));
  return result;
};

export const getCurrentIncompleteWithAllInternals = (withProductsBoms: boolean) => async (dispatch, getState) => {
  const requestUrl = `${apiUrl}/current-incomplete`;
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_NONCONFORMANCEDETAILS,
    payload: axios.get<INonConformanceDetails>(requestUrl)
  });
  const nonConformanceDetail: INonConformanceDetails = getState().nonConformanceDetails.entity;
  if (nonConformanceDetail.id) {
    withProductsBoms && (await dispatch(getAllProductBoms(nonConformanceDetail.products[0].id)));
    await dispatch(getInternalNonConformances(nonConformanceDetail.id));
  }
  return result;
};

export const createEntity = (entity: INonConformanceDetails) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_NONCONFORMANCEDETAILS,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  await dispatch(getCurrentIncomplete());
  const nonConformanceDetail: INonConformanceDetails = getState().nonConformanceDetails.entity;
  if (nonConformanceDetail.id) {
    dispatch(getProcessAuditOfNC(nonConformanceDetail.id));
  }
  return result;
};

export const updateEntity: ICrudPutAction<INonConformanceDetails> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NONCONFORMANCEDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  if (entity.status === Status.INCOMPLETE) {
    dispatch(getCurrentIncomplete());
  } else {
    dispatch(getEntity(entity.id));
    dispatch(getEntities());
  }
  return result;
};

export const completeNonConformance = (entity: INonConformanceDetails, selectEntity: Function) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_NONCONFORMANCEDETAILS,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(refreshNCAndReselectCurrentNC(entity, selectEntity));
  return result;
};

export const deleteEntity: ICrudDeleteAction<INonConformanceDetails> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_NONCONFORMANCEDETAILS,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  dispatch(getAllTasks());
  dispatch(getInternalNonConformances(id));
  dispatch(getCustomerNonConformances(id));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
