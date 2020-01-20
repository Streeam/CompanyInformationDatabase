import pick from 'lodash/pick';
import { IEmployee } from '../model/employee.model';
import { hasAnyAuthority } from '../auth/private-route';
// tslint:disable
import Avatar from '@material-ui/core/Avatar';
// tslint:enable
import { INotification } from '../model/notification.model';
import React, { Fragment } from 'react';
import { Priority } from '../model/enumerations/priority.model';
import { style } from '@material-ui/system';
import { ITask } from '../model/task.model';
import { IProgressTrack } from '../model/progress-track.model';
import { isNull } from 'lodash';
import { Status } from '../model/enumerations/status.model';
import { IImage } from '../model/image.model';
import { INonConformanceDetails } from '../model/non-conformance-details.model';
import { isEmpty, toTitleCase, isArrayEmpty } from './general-utils';
import { CustomerNonconformaceType } from '../model/enumerations/customer-nonconformace-type.model';
import { IRouting } from '../model/routing.model';

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with relationship fields with an empty id and thus
 * resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
  const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

  return pick(entity, keysToKeep);
};

export const unreadNotificationsNumber = (notifications: INotification[]): number =>
  notifications ? notifications.filter(value => !value.read).length : 0;

/**
 * Simply map a list of element to a list a object with the element as id.
 *
 * @param idList Elements to map.
 * @returns The list of objects with mapped ids.
 */
export const mapIdList = (idList: ReadonlyArray<any>) =>
  idList.filter((entityId: any) => entityId !== '').map((entityId: any) => ({ id: entityId }));

export const employeeListWithout = (employeeList: ReadonlyArray<IEmployee>, hasAnyAuthorities: string[]): ReadonlyArray<IEmployee> =>
  employeeList.filter(employee => {
    if (employee.user.authorities.length === 0) {
      return false;
    }
    const authorities: string[] = [];
    employee.user.authorities.map(auth => authorities.push(auth.name));
    return !hasAnyAuthority(authorities, hasAnyAuthorities);
  });

export const priorityStyle = (priority: Priority): JSX.Element => {
  switch (priority) {
    case Priority.LOW:
      return <p style={{ color: 'white', backgroundColor: '#73ce73', margin: '0', padding: '4px' }}>{priority}</p>;
    case Priority.MEDIUM:
      return <p style={{ color: 'white', backgroundColor: 'grey', margin: '0', padding: '4px' }}>{priority}</p>;
    case Priority.HIGH:
      return <p style={{ color: 'white', backgroundColor: '#efae37', margin: '0', padding: '4px' }}>{priority}</p>;
    case Priority.URGENT:
      return <p style={{ color: 'white', backgroundColor: '#ef4040', margin: '0', padding: '4px' }}>{priority}</p>;
    default:
      throw new Error('No such priority');
  }
};

export const statusStyle = (status: Status): JSX.Element => {
  switch (status) {
    case Status.COMPLETE:
      return <p style={{ color: 'white', backgroundColor: '#73ce73', margin: '0', padding: '4px' }}>{status}</p>;
    case Status.NEED_HELP:
      return <p style={{ color: 'white', backgroundColor: '#ffcb00', margin: '0', padding: '4px' }}>{status}</p>;
    case Status.STUCK:
      return <p style={{ color: 'white', backgroundColor: '#ef4040', margin: '0', padding: '4px' }}>{status}</p>;
    case Status.INCOMPLETE:
      return <p style={{ color: 'white', backgroundColor: '#fdab3d', margin: '0', padding: '4px' }}>{status}</p>;
    case Status.PENDING:
      return <p style={{ color: 'white', backgroundColor: '#fdab3d', margin: '0', padding: '4px' }}>{status}</p>;
    default:
      throw new Error('No such priority');
  }
};
export const convertFromIdToEmployee = (id: number, employees: IEmployee[]): IEmployee =>
  employees && employees.length > 0 ? employees.filter(employee => employee.id === id)[0] : null;

export const convertToEmployeeIconName = (employeeToConvert: IEmployee): JSX.Element =>
  employeeToConvert && (
    <div
      title={
        employeeToConvert.user.firstName && employeeToConvert.user.lastName
          ? toTitleCase(employeeToConvert.user.firstName) + ' ' + toTitleCase(employeeToConvert.user.lastName)
          : toTitleCase(employeeToConvert.user.login)
      }
    >
      {employeeToConvert.image && employeeToConvert.imageContentType ? (
        <img
          style={{ maxHeight: '35px', padding: '0 5px 0 0' }}
          src={`data:${employeeToConvert.imageContentType};base64,${employeeToConvert.image}`}
        />
      ) : employeeToConvert.user.firstName && employeeToConvert.user.lastName ? (
        <Avatar>
          {employeeToConvert.user.firstName.substr(0, 1).toUpperCase() + '' + employeeToConvert.user.lastName.substr(0, 1).toUpperCase()}
        </Avatar>
      ) : (
        <Avatar>{employeeToConvert.user.login.substr(0, 1).toUpperCase()}</Avatar>
      )}
    </div>
  );
export const parseCustomerNCType = (ncType: CustomerNonconformaceType): string => {
  switch (ncType) {
    case CustomerNonconformaceType.CUSTOMER_COMPLAINT:
      return 'Customer Complaint';
    case CustomerNonconformaceType.LATE_DELIVERY:
      return 'Late Delivery';
    case CustomerNonconformaceType.NON_CONFORMING_PRODUCT_SERVICE:
      return 'Non Conforming Product/Service';
    default:
      throw new Error('Non existing customer non-conformance type!!');
  }
};
export const getNextUniqueRoutingId = (routings: IRouting[]): number => {
  const listOfRoutingsIds: number[] = !isArrayEmpty(routings) ? routings.map(item => Number(item.uniqueIdentifier)) : [];
  const id = !isArrayEmpty(routings) ? Math.max(...listOfRoutingsIds) + 1 : 1;
  return id;
};
export const downloadebleAttachment = (entity: ITask | IProgressTrack | INonConformanceDetails, images: IImage[]): IImage => {
  if (images && images.length > 0) {
    const attachmentFile = images.filter(image => {
      if ('taskDescription' in entity) {
        return image.taskId === entity.id;
      }
      if ('progressDescription' in entity) {
        return image.progressTrackId === entity.id;
      }
      if ('nonconformance' in entity) {
        return image.nonconformanceDetailsId === entity.id;
      }
    })[0];
    if (attachmentFile) {
      return attachmentFile;
    }
  }
};
// << Roles >>
export const viewNonConformacesPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.viewNonconformance ? currentEmployee.role.viewNonconformance : false) : false;
export const editNonConformacesPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.editNonconformance ? currentEmployee.role.editNonconformance : false) : false;
export const raiseNonConformacesPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.raiseNonconformace ? currentEmployee.role.raiseNonconformace : false) : false;
export const deleteNonConformacesPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.deleteNonconformance ? currentEmployee.role.deleteNonconformance : false) : false;
export const viewTasksPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.viewNonconformanceTasks ? currentEmployee.role.viewNonconformanceTasks : false) : false;
export const editTasksPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.editNonconformanceTasks ? currentEmployee.role.editNonconformanceTasks : false) : false;
export const deleteTasksPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee)
    ? currentEmployee.role.deleteNonconformanceTasks
      ? currentEmployee.role.deleteNonconformanceTasks
      : false
    : false;
export const deleteProductPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.deleteProduct ? currentEmployee.role.deleteProduct : false) : false;
export const editProductPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.editProduct ? currentEmployee.role.editProduct : false) : false;
export const addProductPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.addProduct ? currentEmployee.role.addProduct : false) : false;
export const raiseTaskPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.raiseTask ? currentEmployee.role.raiseTask : false) : false;
export const addProgressTrackPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.addProgressTrack ? currentEmployee.role.addProgressTrack : false) : false;
export const editProgressTrackPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.editProgressTrack ? currentEmployee.role.editProgressTrack : false) : false;
export const viewProgressTrackPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.viewProgressTrack ? currentEmployee.role.viewProgressTrack : false) : false;
export const deleteProgressTrackPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.deleteProgressTrack ? currentEmployee.role.deleteProgressTrack : false) : false;
export const addNonConformanceReasonPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.addNonConformanceReason ? currentEmployee.role.addNonConformanceReason : false) : false;
export const addRootCausePermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.addRootCauses ? currentEmployee.role.addRootCauses : false) : false;
export const deleteCustomerPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.deleteCustomer ? currentEmployee.role.deleteCustomer : false) : false;
export const editCustomerPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.editCustomer ? currentEmployee.role.editCustomer : false) : false;
export const addCustomerPermission = (currentEmployee: IEmployee): boolean =>
  !isEmpty(currentEmployee) ? (currentEmployee.role.addCustomer ? currentEmployee.role.addCustomer : false) : false;
