import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFishBone, defaultValue } from 'app/shared/model/fish-bone.model';

export const ACTION_TYPES = {
  FETCH_FISHBONE_LIST: 'fishBone/FETCH_FISHBONE_LIST',
  FETCH_FISHBONE: 'fishBone/FETCH_FISHBONE',
  CREATE_FISHBONE: 'fishBone/CREATE_FISHBONE',
  UPDATE_FISHBONE: 'fishBone/UPDATE_FISHBONE',
  DELETE_FISHBONE: 'fishBone/DELETE_FISHBONE',
  RESET: 'fishBone/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFishBone>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type FishBoneState = Readonly<typeof initialState>;

// Reducer

export default (state: FishBoneState = initialState, action): FishBoneState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_FISHBONE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FISHBONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_FISHBONE):
    case REQUEST(ACTION_TYPES.UPDATE_FISHBONE):
    case REQUEST(ACTION_TYPES.DELETE_FISHBONE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_FISHBONE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FISHBONE):
    case FAILURE(ACTION_TYPES.CREATE_FISHBONE):
    case FAILURE(ACTION_TYPES.UPDATE_FISHBONE):
    case FAILURE(ACTION_TYPES.DELETE_FISHBONE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_FISHBONE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_FISHBONE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_FISHBONE):
    case SUCCESS(ACTION_TYPES.UPDATE_FISHBONE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_FISHBONE):
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

const apiUrl = 'api/fish-bones';

// Actions
// getRootCauseFishboneItems
export const getEntities: ICrudGetAllAction<IFishBone> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FISHBONE_LIST,
  payload: axios.get<IFishBone>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getRootCauseFishboneItems = (rootCauseId: number) => ({
  type: ACTION_TYPES.FETCH_FISHBONE_LIST,
  payload: axios.get<IFishBone>(`${apiUrl}/root-cause/${rootCauseId}`)
});

export const getEntity: ICrudGetAction<IFishBone> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FISHBONE,
    payload: axios.get<IFishBone>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IFishBone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FISHBONE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getRootCauseFishboneItems(entity.rootCauseId));
  return result;
};

export const updateEntity: ICrudPutAction<IFishBone> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FISHBONE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getRootCauseFishboneItems(entity.rootCauseId));
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFishBone> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FISHBONE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
