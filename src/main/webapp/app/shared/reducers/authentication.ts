import axios from 'axios';
import { Storage } from 'react-jhipster';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { AUTHORITIES } from 'app/config/constants';
import { getEntities as getCompanies } from '../../entities/company/company.reducer';
import { getCurrentEntities as getCurrentEmployeesNotifications } from '../../entities/notification/notification.reducer';
import { getCurentProgressTracks } from '../../entities/progress-track/progress-track.reducer';
import { getCurrentEntities as getCurrentEmployeesNonConformances } from '../../entities/non-conformance-details/non-conformance-details.reducer';
import { getCurrentTasks } from '../../entities/task/task.reducer';
import { getCurrentEmployeeEntity } from '../../entities/employee/employee.reducer';
import { getEntities as getSites } from '../../entities/site/site.reducer';
import { getEntities as getDepatments } from '../../entities/department/department.reducer';
import { hasAnyAuthority } from '../auth/private-route';
import { hasOnlyUserRole } from '../auth/private-home-route';

export const ACTION_TYPES = {
  LOGIN: 'authentication/LOGIN',
  GET_SESSION: 'authentication/GET_SESSION',
  GET_ROLES: 'authentication/GET_ROLES',
  LOGOUT: 'authentication/LOGOUT',
  CLEAR_AUTH: 'authentication/CLEAR_AUTH',
  ERROR_MESSAGE: 'authentication/ERROR_MESSAGE'
};

const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const initialState = {
  loading: false,
  isAuthenticated: false,
  isCurrentUserManager: false,
  isCurrentUserAdmin: false,
  isUnemployed: false,
  loginSuccess: false,
  loginError: false, // Errors returned from server side
  showModalLogin: false,
  account: {} as any,
  errorMessage: null as string, // Errors returned from server side
  redirectMessage: null as string,
  sessionHasBeenFetched: false,
  idToken: null as string,
  logoutUrl: null as string
};

export type AuthenticationState = Readonly<typeof initialState>;

// Reducer

export default (state: AuthenticationState = initialState, action): AuthenticationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.LOGIN):
    case REQUEST(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: true
      };
    case FAILURE(ACTION_TYPES.LOGIN):
      return {
        ...initialState,
        errorMessage: action.payload,
        showModalLogin: true,
        loginError: true
      };
    case FAILURE(ACTION_TYPES.GET_SESSION):
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        sessionHasBeenFetched: true,
        showModalLogin: true,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.LOGIN):
      return {
        ...state,
        loading: false,
        loginError: false,
        showModalLogin: false,
        loginSuccess: true
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...initialState,
        showModalLogin: true
      };
    case SUCCESS(ACTION_TYPES.GET_SESSION): {
      const isAuthenticated = action.payload && action.payload.data && action.payload.data.activated;
      const account = action.payload && action.payload.data ? action.payload.data : null;
      const authorities: string[] = account ? account.authorities : [];

      return {
        ...state,
        isAuthenticated,
        loading: false,
        sessionHasBeenFetched: true,
        account: action.payload.data,
        isCurrentUserManager: hasAnyAuthority(authorities, [AUTHORITIES.MANAGER]),
        isCurrentUserAdmin: hasAnyAuthority(authorities, [AUTHORITIES.ADMIN]),
        isUnemployed: hasOnlyUserRole(authorities)
      };
    }
    case ACTION_TYPES.ERROR_MESSAGE:
      return {
        ...initialState,
        showModalLogin: true,
        redirectMessage: action.message
      };
    case ACTION_TYPES.CLEAR_AUTH:
      return {
        ...state,
        loading: false,
        showModalLogin: true,
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export const displayAuthError = message => ({ type: ACTION_TYPES.ERROR_MESSAGE, message });

export const getAccount = () => async dispatch => {
  dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('api/account')
  });
};

export const getSession = () => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.GET_SESSION,
    payload: axios.get('api/account')
  });
  dispatch(getCompanies());
  dispatch(getCurrentEmployeesNotifications());
  dispatch(getCurrentEmployeesNonConformances());
  dispatch(getCurrentTasks());
  dispatch(getCurentProgressTracks());
  dispatch(getCurrentEmployeeEntity());
  dispatch(getSites());
  dispatch(getDepatments());
  return result;
};

export const login = (username, password, rememberMe = false) => async (dispatch, getState) => {
  const result = await dispatch({
    type: ACTION_TYPES.LOGIN,
    payload: axios.post('api/authenticate', { username, password, rememberMe })
  });
  const bearerToken = result.value.headers.authorization;
  if (bearerToken && bearerToken.slice(0, 7) === 'Bearer ') {
    const jwt = bearerToken.slice(7, bearerToken.length);
    if (rememberMe) {
      Storage.local.set(AUTH_TOKEN_KEY, jwt);
    } else {
      Storage.session.set(AUTH_TOKEN_KEY, jwt);
    }
  }
  await dispatch(getSession());
};

export const clearAuthToken = () => {
  if (Storage.local.get(AUTH_TOKEN_KEY)) {
    Storage.local.remove(AUTH_TOKEN_KEY);
  }
  if (Storage.session.get(AUTH_TOKEN_KEY)) {
    Storage.session.remove(AUTH_TOKEN_KEY);
  }
};

export const logout = () => dispatch => {
  clearAuthToken();
  dispatch({
    type: ACTION_TYPES.LOGOUT
  });
};

export const clearAuthentication = messageKey => (dispatch, getState) => {
  clearAuthToken();
  dispatch(displayAuthError(messageKey));
  dispatch({
    type: ACTION_TYPES.CLEAR_AUTH
  });
};
