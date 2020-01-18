import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IEmployee, defaultValue } from 'app/shared/model/employee.model';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';

export const ACTION_TYPES = {
  FETCH_EMPLOYEE_LIST: 'employee/FETCH_EMPLOYEE_LIST',
  FETCH_COMPANYS_EMPLOYEE_LIST: 'employee/FETCH_COMPANY_EMPLOYEE_LIST',
  FETCH_EMPLOYEE: 'employee/FETCH_EMPLOYEE',
  FETCH_CURRENT_EMPLOYEE: 'employee/FETCH_CURRENT_EMPLOYEE',
  CREATE_EMPLOYEE: 'employee/CREATE_EMPLOYEE',
  UPDATE_EMPLOYEE: 'employee/UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE: 'employee/DELETE_EMPLOYEE',
  SET_BLOB: 'employee/SET_BLOB',
  RESET: 'employee/RESET',
  JOIN: 'employee/JOIN_COMPANY',
  INVITE: 'employee/INVITE_EMPLOYEE',
  ACCEPT_INVITE: 'employee/ACCEPT_INVITE',
  REJECT_INVITE: 'employee/REJECT_INVITE'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IEmployee>,
  companysEntities: [] as ReadonlyArray<IEmployee>,
  entity: defaultValue,
  currentEmployeeEntity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type EmployeeState = Readonly<typeof initialState>;

// Reducer

export default (state: EmployeeState = initialState, action): EmployeeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_COMPANYS_EMPLOYEE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_EMPLOYEE):
    case REQUEST(ACTION_TYPES.FETCH_CURRENT_EMPLOYEE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_EMPLOYEE):
    case REQUEST(ACTION_TYPES.UPDATE_EMPLOYEE):
    case REQUEST(ACTION_TYPES.DELETE_EMPLOYEE):
    case REQUEST(ACTION_TYPES.JOIN):
    case REQUEST(ACTION_TYPES.INVITE):
    case REQUEST(ACTION_TYPES.ACCEPT_INVITE):
    case REQUEST(ACTION_TYPES.REJECT_INVITE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_COMPANYS_EMPLOYEE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_EMPLOYEE):
    case FAILURE(ACTION_TYPES.FETCH_CURRENT_EMPLOYEE):
    case FAILURE(ACTION_TYPES.CREATE_EMPLOYEE):
    case FAILURE(ACTION_TYPES.UPDATE_EMPLOYEE):
    case FAILURE(ACTION_TYPES.DELETE_EMPLOYEE):
    case FAILURE(ACTION_TYPES.JOIN):
    case FAILURE(ACTION_TYPES.INVITE):
    case FAILURE(ACTION_TYPES.ACCEPT_INVITE):
    case FAILURE(ACTION_TYPES.REJECT_INVITE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10)
      };
    case SUCCESS(ACTION_TYPES.FETCH_COMPANYS_EMPLOYEE_LIST):
      return {
        ...state,
        loading: false,
        companysEntities: action.payload.data.filter(value =>
          hasAnyAuthority(value.user.authorities.map(item => item.name), [AUTHORITIES.MANAGER, AUTHORITIES.EMPLOYEE])
        )
      };
    case SUCCESS(ACTION_TYPES.FETCH_EMPLOYEE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CURRENT_EMPLOYEE):
      return {
        ...state,
        loading: false,
        currentEmployeeEntity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_EMPLOYEE):
    case SUCCESS(ACTION_TYPES.UPDATE_EMPLOYEE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_EMPLOYEE):
    case SUCCESS(ACTION_TYPES.JOIN):
    case SUCCESS(ACTION_TYPES.INVITE):
    case SUCCESS(ACTION_TYPES.ACCEPT_INVITE):
    case SUCCESS(ACTION_TYPES.REJECT_INVITE):
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

const apiUrl = 'api/employees';

// Actions

export const getEntities: ICrudGetAllAction<IEmployee> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEE_LIST,
    payload: axios.get<IEmployee>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getAllEntities = () => {
  const requestUrl = `${apiUrl}/all?cacheBuster=${new Date().getTime()}`;
  return {
    type: ACTION_TYPES.FETCH_COMPANYS_EMPLOYEE_LIST,
    payload: axios.get<IEmployee>(requestUrl)
  };
};

export const getEntity: ICrudGetAction<IEmployee> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_EMPLOYEE,
    payload: axios.get<IEmployee>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IEmployee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_EMPLOYEE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const getCurrentEmployeeEntity = () => {
  const requestUrl = `${apiUrl}/current-employee`;
  return {
    type: ACTION_TYPES.FETCH_CURRENT_EMPLOYEE,
    payload: axios.get<IEmployee>(requestUrl)
  };
};

export const updateEntity: ICrudPutAction<IEmployee> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_EMPLOYEE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getCurrentEmployeeEntity());
  dispatch(getAllEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IEmployee> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_EMPLOYEE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
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
