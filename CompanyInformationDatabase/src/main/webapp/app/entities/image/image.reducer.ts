import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IImage, defaultValue } from 'app/shared/model/image.model';
import moment from 'moment';

export const ACTION_TYPES = {
  FETCH_IMAGE_LIST: 'image/FETCH_IMAGE_LIST',
  FETCH_IMAGE: 'image/FETCH_IMAGE',
  CREATE_IMAGE: 'image/CREATE_IMAGE',
  UPDATE_IMAGE: 'image/UPDATE_IMAGE',
  UPLOAD_FILE: 'file/UPLOAD_FILE',
  DOWNLOADED_FILE: 'file/DOWNLOADED_FILE',
  DELETE_IMAGE: 'image/DELETE_IMAGE',
  RESET: 'image/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  uploadedFileURL: null,
  downloadedFile: null,
  entities: [] as ReadonlyArray<IImage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ImageState = Readonly<typeof initialState>;

// Reducer

export default (state: ImageState = initialState, action): ImageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_IMAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_IMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_IMAGE):
    case REQUEST(ACTION_TYPES.UPDATE_IMAGE):
    case REQUEST(ACTION_TYPES.UPLOAD_FILE):
    case REQUEST(ACTION_TYPES.DOWNLOADED_FILE):
    case REQUEST(ACTION_TYPES.DELETE_IMAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_IMAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_IMAGE):
    case FAILURE(ACTION_TYPES.CREATE_IMAGE):
    case FAILURE(ACTION_TYPES.UPDATE_IMAGE):
    case FAILURE(ACTION_TYPES.DOWNLOADED_FILE):
    case FAILURE(ACTION_TYPES.UPLOAD_FILE):
    case FAILURE(ACTION_TYPES.DELETE_IMAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_IMAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_IMAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_IMAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.UPLOAD_FILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        uploadedFileURL: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DOWNLOADED_FILE):
      return {
        ...state,
        updating: false,
        updateSuccess: true
      };
    case SUCCESS(ACTION_TYPES.DELETE_IMAGE):
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

const apiUrl = 'api/images';

// Actions

export const getEntities: ICrudGetAllAction<IImage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_IMAGE_LIST,
  payload: axios.get<IImage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IImage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_IMAGE,
    payload: axios.get<IImage>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_IMAGE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IImage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_IMAGE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IImage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_IMAGE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});

export const uploadFile = (file: FormData, imageId: number) => {
  const requestUrl = `${apiUrl}/upload/${imageId}`;
  return {
    type: ACTION_TYPES.UPLOAD_FILE,
    payload: axios.post(requestUrl, file)
  };
};

export const downloadFile = (fileName: string, fileId: number) => {
  const requestUrl = `${apiUrl}/download/${fileId}/${fileName}`;
  return {
    type: ACTION_TYPES.DOWNLOADED_FILE,
    payload: axios.get(requestUrl, { responseType: 'blob' }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    })
  };
};
