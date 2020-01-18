import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IActionToBeTaken, defaultValue } from 'app/shared/model/action-to-be-taken.model';
import { getRootCauseFishboneItems } from '../fish-bone/fish-bone.reducer';

export const ACTION_TYPES = {
  FETCH_ACTIONTOBETAKEN_LIST: 'actionToBeTaken/FETCH_ACTIONTOBETAKEN_LIST',
  FETCH_ACTIONTOBETAKEN: 'actionToBeTaken/FETCH_ACTIONTOBETAKEN',
  CREATE_ACTIONTOBETAKEN: 'actionToBeTaken/CREATE_ACTIONTOBETAKEN',
  UPDATE_ACTIONTOBETAKEN: 'actionToBeTaken/UPDATE_ACTIONTOBETAKEN',
  DELETE_ACTIONTOBETAKEN: 'actionToBeTaken/DELETE_ACTIONTOBETAKEN',
  RESET: 'actionToBeTaken/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IActionToBeTaken>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ActionToBeTakenState = Readonly<typeof initialState>;

// Reducer

export default (state: ActionToBeTakenState = initialState, action): ActionToBeTakenState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACTIONTOBETAKEN_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ACTIONTOBETAKEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ACTIONTOBETAKEN):
    case REQUEST(ACTION_TYPES.UPDATE_ACTIONTOBETAKEN):
    case REQUEST(ACTION_TYPES.DELETE_ACTIONTOBETAKEN):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ACTIONTOBETAKEN_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ACTIONTOBETAKEN):
    case FAILURE(ACTION_TYPES.CREATE_ACTIONTOBETAKEN):
    case FAILURE(ACTION_TYPES.UPDATE_ACTIONTOBETAKEN):
    case FAILURE(ACTION_TYPES.DELETE_ACTIONTOBETAKEN):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACTIONTOBETAKEN_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACTIONTOBETAKEN):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ACTIONTOBETAKEN):
    case SUCCESS(ACTION_TYPES.UPDATE_ACTIONTOBETAKEN):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACTIONTOBETAKEN):
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

const apiUrl = 'api/root-cause';

// Actions

export const getEntities: ICrudGetAllAction<IActionToBeTaken> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ACTIONTOBETAKEN_LIST,
  payload: axios.get<IActionToBeTaken>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IActionToBeTaken> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ACTIONTOBETAKEN,
    payload: axios.get<IActionToBeTaken>(requestUrl)
  };
};
export const getNonConformaceRootCause = nonConformanceId => async (dispatch, getState) => {
  const requestUrl = `${apiUrl}/nonConformance/${nonConformanceId}`;
  const result = await dispatch({
    type: ACTION_TYPES.FETCH_ACTIONTOBETAKEN,
    payload: axios.get<IActionToBeTaken>(requestUrl)
  });
  return result;
};
export const createEntity: ICrudPutAction<IActionToBeTaken> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ACTIONTOBETAKEN,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IActionToBeTaken> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACTIONTOBETAKEN,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IActionToBeTaken> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACTIONTOBETAKEN,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
