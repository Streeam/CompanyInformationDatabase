import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';
import { getEntity as getTask, getEntities as getTasks } from '../task/task.reducer';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { uploadFile, getEntities as getAllImages, createEntity as createImage, updateEntity as updateImage } from '../image/image.reducer';
import { IProgressTrack, defaultValue } from 'app/shared/model/progress-track.model';
import { IImage } from 'app/shared/model/image.model';
import moment from 'moment';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';

export const ACTION_TYPES = {
  FETCH_PROGRESSTRACK_LIST: 'progressTrack/FETCH_PROGRESSTRACK_LIST',
  FETCH_CURRENT_PROGRESSTRACK_LIST: 'progressTrack/FETCH_CURRENT_PROGRESSTRACK_LIST',
  FETCH_PROGRESSTRACK: 'progressTrack/FETCH_PROGRESSTRACK',
  CREATE_PROGRESSTRACK: 'progressTrack/CREATE_PROGRESSTRACK',
  UPDATE_PROGRESSTRACK: 'progressTrack/UPDATE_PROGRESSTRACK',
  DELETE_PROGRESSTRACK: 'progressTrack/DELETE_PROGRESSTRACK',
  SET_BLOB: 'progressTrack/SET_BLOB',
  RESET: 'progressTrack/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IProgressTrack>,
  curentEntities: [] as ReadonlyArray<IProgressTrack>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ProgressTrackState = Readonly<typeof initialState>;

// Reducer

export default (state: ProgressTrackState = initialState, action): ProgressTrackState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PROGRESSTRACK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_PROGRESSTRACK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PROGRESSTRACK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_PROGRESSTRACK):
    case REQUEST(ACTION_TYPES.UPDATE_PROGRESSTRACK):
    case REQUEST(ACTION_TYPES.DELETE_PROGRESSTRACK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_PROGRESSTRACK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_PROGRESSTRACK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PROGRESSTRACK):
    case FAILURE(ACTION_TYPES.CREATE_PROGRESSTRACK):
    case FAILURE(ACTION_TYPES.UPDATE_PROGRESSTRACK):
    case FAILURE(ACTION_TYPES.DELETE_PROGRESSTRACK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRESSTRACK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_PROGRESSTRACK_LIST):
      return {
        ...state,
        loading: false,
        curentEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_PROGRESSTRACK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_PROGRESSTRACK):
    case SUCCESS(ACTION_TYPES.UPDATE_PROGRESSTRACK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_PROGRESSTRACK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB: {
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    }
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/progress-tracks';

// Actions

export const getEntities: ICrudGetAllAction<IProgressTrack> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PROGRESSTRACK_LIST,
  payload: axios.get<IProgressTrack>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getTasksProgressTracks = (taskId: number) => {
  const requestUrl = `${apiUrl}/task/${taskId}`;
  return {
    type: ACTION_TYPES.FETCH_PROGRESSTRACK_LIST,
    payload: axios.get<IProgressTrack>(requestUrl)
  };
};

export const getCurentProgressTracks = () => {
  const requestUrl = `${apiUrl}/current`;
  return {
    type: ACTION_TYPES.FETCH_CURRENT_PROGRESSTRACK_LIST,
    payload: axios.get<IProgressTrack>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IProgressTrack> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PROGRESSTRACK,
    payload: axios.get<IProgressTrack>(requestUrl)
  };
};

export const createEntity = (entity: IProgressTrack) => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PROGRESSTRACK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  dispatch(getTasks());
  dispatch(getTask(entity.taskId));
  return result;
};

export const updateEntity = (entity: IProgressTrack, file?: File) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PROGRESSTRACK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  dispatch(getTask(entity.taskId));
  dispatch(getTasks());

  if (file) {
    await dispatch(getAllImages());
    const progressTrackId = getState().progressTrack.entity.id;
    const imageToSave = imageToUpload(file, getState);
    const allImages: IImage[] = getState().image.entities;
    const doesImageAlreadyExists: boolean =
      allImages.filter(image => image.progressTrackId && image.progressTrackId === progressTrackId)[0] > 0;
    if (doesImageAlreadyExists) {
      await dispatch(updateImage(imageToSave));
    } else {
      await dispatch(createImage(imageToSave));
    }
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadFile(formData, getState().image.entity.id));
  }
  return result;
};

export const deleteEntity = (progressTrack: IProgressTrack) => async dispatch => {
  const requestUrl = `${apiUrl}/${progressTrack.id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PROGRESSTRACK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  dispatch(getTasks());
  dispatch(getTask(progressTrack.taskId));
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
const imageToUpload = (file: File, getState): IImage => {
  const imageToSave: IImage = {
    urlPath: file.name,
    name: file.name,
    lastModifiedDate: moment(file.lastModified),
    size: file.size,
    type: file.type,
    progressTrackId: getState().progressTrack.entity.id
  };
  return imageToSave;
};
