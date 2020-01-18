import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IAmendment, defaultValue } from 'app/shared/model/amendment.model';

export const ACTION_TYPES = {
  FETCH_AMENDMENT_LIST: 'amendment/FETCH_AMENDMENT_LIST',
  FETCH_AMENDMENT: 'amendment/FETCH_AMENDMENT',
  CREATE_AMENDMENT: 'amendment/CREATE_AMENDMENT',
  UPDATE_AMENDMENT: 'amendment/UPDATE_AMENDMENT',
  DELETE_AMENDMENT: 'amendment/DELETE_AMENDMENT',
  RESET: 'amendment/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IAmendment>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type AmendmentState = Readonly<typeof initialState>;

// Reducer

export default (state: AmendmentState = initialState, action): AmendmentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_AMENDMENT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_AMENDMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_AMENDMENT):
    case REQUEST(ACTION_TYPES.UPDATE_AMENDMENT):
    case REQUEST(ACTION_TYPES.DELETE_AMENDMENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_AMENDMENT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_AMENDMENT):
    case FAILURE(ACTION_TYPES.CREATE_AMENDMENT):
    case FAILURE(ACTION_TYPES.UPDATE_AMENDMENT):
    case FAILURE(ACTION_TYPES.DELETE_AMENDMENT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_AMENDMENT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_AMENDMENT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_AMENDMENT):
    case SUCCESS(ACTION_TYPES.UPDATE_AMENDMENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_AMENDMENT):
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

const apiUrl = 'api/amendments';

// Actions

export const getEntities: ICrudGetAllAction<IAmendment> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_AMENDMENT_LIST,
  payload: axios.get<IAmendment>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IAmendment> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_AMENDMENT,
    payload: axios.get<IAmendment>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IAmendment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_AMENDMENT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IAmendment> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_AMENDMENT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IAmendment> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_AMENDMENT,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
