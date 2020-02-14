import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDrawing, defaultValue } from 'app/shared/model/drawing.model';

export const ACTION_TYPES = {
  FETCH_DRAWING_LIST: 'drawing/FETCH_DRAWING_LIST',
  FETCH_DRAWING: 'drawing/FETCH_DRAWING',
  CREATE_DRAWING: 'drawing/CREATE_DRAWING',
  UPDATE_DRAWING: 'drawing/UPDATE_DRAWING',
  DELETE_DRAWING: 'drawing/DELETE_DRAWING',
  RESET: 'drawing/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDrawing>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DrawingState = Readonly<typeof initialState>;

// Reducer

export default (state: DrawingState = initialState, action): DrawingState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRAWING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRAWING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRAWING):
    case REQUEST(ACTION_TYPES.UPDATE_DRAWING):
    case REQUEST(ACTION_TYPES.DELETE_DRAWING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRAWING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRAWING):
    case FAILURE(ACTION_TYPES.CREATE_DRAWING):
    case FAILURE(ACTION_TYPES.UPDATE_DRAWING):
    case FAILURE(ACTION_TYPES.DELETE_DRAWING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRAWING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRAWING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRAWING):
    case SUCCESS(ACTION_TYPES.UPDATE_DRAWING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRAWING):
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

const apiUrl = 'api/drawings';

// Actions

export const getEntities: ICrudGetAllAction<IDrawing> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRAWING_LIST,
  payload: axios.get<IDrawing>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDrawing> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRAWING,
    payload: axios.get<IDrawing>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDrawing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRAWING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDrawing> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRAWING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDrawing> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRAWING,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
