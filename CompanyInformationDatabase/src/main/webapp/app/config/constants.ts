const config = {
  VERSION: process.env.VERSION
};

export default config;

export const SERVER_API_URL = process.env.SERVER_API_URL;

export const AUTHORITIES = {
  ADMIN: 'ROLE_ADMIN',
  USER: 'ROLE_USER',
  MANAGER: 'ROLE_MANAGER',
  EMPLOYEE: 'ROLE_EMPLOYEE'
};

export const PARENTS = {
  NOTIFICATIONS_READ: 'NOTIFICATIONS_READ',
  NOTIFICATIONS_UNREAD: 'NOTIFICATIONS_UNREAD',
  NOTIFICATIONS_ALL: 'NOTIFICATIONS_ALL',
  NON_CONFORMANCES_COMPLETE: 'NON_CONFORMANCES_COMPLETE',
  NON_CONFORMANCES_PENDING: 'NON_CONFORMANCES_PENDING',
  TASKS_COMPLETE: 'TASKS_COMPLETE',
  TASKS_PENDING: 'TASKS_PENDING',
  TO_DO_LIST_COMPLETE: 'TO_DO_LIST_COMPLETE',
  TO_DO_LIST_PENDING: 'TO_DO_LIST_PENDING'
};

export const messages = {
  DATA_ERROR_ALERT: 'Internal Error'
};

export const APP_DATE_FORMAT = 'DD/MM/YY HH:mm';
export const APP_TIMESTAMP_FORMAT = 'DD/MM/YY HH:mm:ss';
export const APP_LOCAL_DATE_FORMAT = 'DD/MM/YYYY';
export const APP_LOCAL_DATE_FORMAT_2 = 'dd MMMM yyyy';
export const APP_LOCAL_DATETIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const APP_LOCAL_DATETIME_FORMAT_Z = 'YYYY-MM-DDTHH:mm Z';
export const APP_WHOLE_NUMBER_FORMAT = '0,0';
export const APP_TWO_DIGITS_AFTER_POINT_NUMBER_FORMAT = '0,0.[00]';

export const NOTIFICATIONS = {
  INVITATION: 'INVITATION',
  WELCOME: 'WELCOME',
  NEW_EMPLOYEE: 'NEW_EMPLOYEE',
  FIRED: 'FIRED',
  ACCEPT_INVITE: 'ACCEPT_INVITE',
  REJECT_REQUEST: 'REJECT_REQUEST',
  REQUEST_TO_JOIN: 'REQUEST_TO_JOIN',
  LEFT_COMPANY: 'LEFT_COMPANY',
  COMPANY_DELETED: 'COMPANY_DELETED',
  ACCEPT_REQUEST: 'ACCEPT_REQUEST',
  REJECT_INVITE: 'REJECT_INVITE',
  OTHERS: 'OTHERS'
};
export const NONCONFORMANCE_ACTIONS = {
  REJECTION_REASON: 'REJECTION_REASON',
  ROOT_CAUSE: 'ROOT_CAUSE',
  SHORT_TERM: 'SHORT_TERM',
  LONG_TERM: 'LONG_TERM'
};
