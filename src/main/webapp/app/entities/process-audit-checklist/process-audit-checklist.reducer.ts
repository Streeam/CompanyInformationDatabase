import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IProcessAuditChecklist, defaultValue } from 'app/shared/model/process-audit-checklist.model';

export const ACTION_TYPES = {
  FETCH_PROCESSAUDITCHECKLIST_LIST: 'processAuditChecklist/FETCH_PROCESSAUDITCHECKLIST_LIST',
  FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST: 'processAuditChecklist/FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST',
  FETCH_PROCESSAUDITCHECKLIST: 'processAuditChecklist/FETCH_PROCESSAUDITCHECKLIST',
  CREATE_PROCESSAUDITCHECKLIST: 'processAuditChecklist/CREATE_PROCESSAUDITCHECKLIST',
  UPDATE_PROCESSAUDITCHECKLIST: 'processAuditChecklist/UPDATE_PROCESSAUDITCHECKLIST',
  DELETE_PROCESSAUDITCHECKLIST: 'processAuditChecklist/DELETE_PROCESSAUDITCHECKLIST',
  RESET: 'processAuditChecklist/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProcessAuditChecklist>,
  processAuditChecklistOfNC: [] as ReadonlyArray<IProcessAuditChecklist>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProcessAuditChecklistState = Readonly<typeof initialState>;

// Reducer

export default (state: ProcessAuditChecklistState = initialState, action): ProcessAuditChecklistState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROCESSAUDITCHECKLIST):
    case REQUEST(ACTION_TYPES.UPDATE_PROCESSAUDITCHECKLIST):
    case REQUEST(ACTION_TYPES.DELETE_PROCESSAUDITCHECKLIST):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST):
    case FAILURE(ACTION_TYPES.CREATE_PROCESSAUDITCHECKLIST):
    case FAILURE(ACTION_TYPES.UPDATE_PROCESSAUDITCHECKLIST):
    case FAILURE(ACTION_TYPES.DELETE_PROCESSAUDITCHECKLIST):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST):
      return {
        ...state,
        loading: false,
        processAuditChecklistOfNC: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROCESSAUDITCHECKLIST):
    case SUCCESS(ACTION_TYPES.UPDATE_PROCESSAUDITCHECKLIST):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROCESSAUDITCHECKLIST):
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

const apiUrl = 'api/process-audit-checklists';

// Actions

export const getEntities: ICrudGetAllAction<IProcessAuditChecklist> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_LIST,
  payload: axios.get<IProcessAuditChecklist>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IProcessAuditChecklist> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST,
    payload: axios.get<IProcessAuditChecklist>(requestUrl)
  };
};
export const getProcessAuditOfNC: ICrudGetAction<IProcessAuditChecklist> = nonConformanceId => {
  const requestUrl = `${apiUrl}/non-conformance/${nonConformanceId}`;
  return {
    type: ACTION_TYPES.FETCH_PROCESSAUDITCHECKLIST_OF_NONCONFORMANCE_LIST,
    payload: axios.get<IProcessAuditChecklist>(requestUrl)
  };
};
export const createEntity: ICrudPutAction<IProcessAuditChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROCESSAUDITCHECKLIST,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IProcessAuditChecklist> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROCESSAUDITCHECKLIST,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IProcessAuditChecklist> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROCESSAUDITCHECKLIST,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
