import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { uploadFile, getEntities as getAllImages, createEntity as createImage, updateEntity as updateImage } from '../image/image.reducer';
import { refreshNCAndReselectCurrentNC } from '../non-conformance-details/non-conformance-details.reducer';
import { getCurrentEntities as getCurentNotifications } from '../notification/notification.reducer';
import { ITask, defaultValue } from 'app/shared/model/task.model';
import { IImage } from 'app/shared/model/image.model';
import moment from 'moment';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';

export const ACTION_TYPES = {
  FETCH_TASK_LIST: 'task/FETCH_TASK_LIST',
  FETCH_CURRENT_TASK_LIST: 'task/FETCH_CURRENT_TASK_LIST',
  FETCH_TASK: 'task/FETCH_TASK',
  CREATE_TASK: 'task/CREATE_TASK',
  UPDATE_TASK: 'task/UPDATE_TASK',
  DELETE_TASK: 'task/DELETE_TASK',
  RESET: 'task/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITask>,
  currentEntities: [] as ReadonlyArray<ITask>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type TaskState = Readonly<typeof initialState>;

// Reducer

export default (state: TaskState = initialState, action): TaskState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TASK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_TASK_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_TASK):
    case REQUEST(ACTION_TYPES.UPDATE_TASK):
    case REQUEST(ACTION_TYPES.DELETE_TASK):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_TASK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_TASK_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TASK):
    case FAILURE(ACTION_TYPES.CREATE_TASK):
    case FAILURE(ACTION_TYPES.UPDATE_TASK):
    case FAILURE(ACTION_TYPES.DELETE_TASK):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASK_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_TASK_LIST):
      return {
        ...state,
        loading: false,
        currentEntities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_TASK):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_TASK):
    case SUCCESS(ACTION_TYPES.UPDATE_TASK):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_TASK):
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

const apiUrl = 'api/tasks';

// Actions
export const getEntities: ICrudGetAllAction<ITask> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TASK_LIST,
  payload: axios.get<ITask>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getNonConformanceTasks = (nonconformanceDetailsid: number) => {
  const requestUrl = `${apiUrl}/nonconformace/${nonconformanceDetailsid}`;
  return {
    type: ACTION_TYPES.FETCH_TASK_LIST,
    payload: axios.get<ITask>(requestUrl)
  };
};

export const getCurrentTasks = () => {
  const requestUrl = `${apiUrl}/current-employee`;
  return {
    type: ACTION_TYPES.FETCH_CURRENT_TASK_LIST,
    payload: axios.get<ITask>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<ITask> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TASK,
    payload: axios.get<ITask>(requestUrl)
  };
};

export const createEntity = (
  entity: ITask,
  file?: File,
  nonconformace?: INonConformanceDetails,
  selectNonConformanceAfterUpdate?: Function
) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TASK,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  await dispatch(getAllImages());
  if (file) {
    const taskId = getState().task.entity.id;
    const imageToSave = imageToUpload(file, getState);
    const allImages: IImage[] = getState().image.entities;
    const doesImageAlreadyExists: boolean = allImages.filter(image => image.taskId && image.taskId === taskId)[0] > 0;
    if (doesImageAlreadyExists) {
      throw new Error('Image with this task already exists');
    } else {
      await dispatch(createImage(imageToSave));
    }
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadFile(formData, getState().image.entity.id));
  }
  dispatch(refreshNCAndReselectCurrentNC(nonconformace, selectNonConformanceAfterUpdate));
  dispatch(getCurentNotifications());
  return result;
};

export const updateEntity = (
  entity: ITask,
  file?: File,
  nonconformace?: INonConformanceDetails,
  selectNonConformanceAfterUpdate?: Function
) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TASK,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  await dispatch(getAllImages());
  if (file) {
    const taskId = getState().task.entity.id;
    const imageToSave = imageToUpload(file, getState);
    const allImages: IImage[] = getState().image.entities;
    const doesImageAlreadyExists: boolean = allImages.filter(image => image.taskId && image.taskId === taskId)[0] > 0;
    if (doesImageAlreadyExists) {
      await dispatch(updateImage(imageToSave));
    } else {
      await dispatch(createImage(imageToSave));
    }
    const formData = new FormData();
    formData.append('file', file);
    dispatch(uploadFile(formData, getState().image.entity.id));
  }
  dispatch(refreshNCAndReselectCurrentNC(nonconformace, selectNonConformanceAfterUpdate));
  return result;
};

export const deleteEntity = (task: ITask, nonconformace: INonConformanceDetails, selectEntity: Function) => async dispatch => {
  const requestUrl = `${apiUrl}/${task.id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TASK,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  dispatch(refreshNCAndReselectCurrentNC(nonconformace, selectEntity));
  return result;
};

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
    taskId: getState().task.entity.id
  };
  return imageToSave;
};
