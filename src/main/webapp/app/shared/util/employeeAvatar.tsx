import React, { Fragment } from 'react';
import { IEmployee } from '../model/employee.model';
import { toTitleCase } from './general-utils';

interface IEmployeeAvatarProps {
  employee: IEmployee;
  maxHeight: string;
}

const employeeAvatar = (props: IEmployeeAvatarProps) => {
  const { employee, maxHeight } = props;
  return (
    employee.id && (
      <div
        title={
          employee.user.firstName && employee.user.lastName
            ? toTitleCase(employee.user.firstName) + ' ' + toTitleCase(employee.user.lastName)
            : toTitleCase(employee.user.login)
        }
      >
        {employee.image && employee.imageContentType ? (
          <div>
            <img
              src={`data:${employee.imageContentType};base64,${employee.image}`}
              style={{
                maxHeight: `${maxHeight}`,
                borderRadius: '50%'
              }}
            />
          </div>
        ) : (
          <div>
            <img
              src={`content/images/default_profile_icon.png`}
              style={{
                maxHeight: `${maxHeight}`,
                borderRadius: '50%'
              }}
            />
          </div>
        )}
      </div>
    )
  );
};

export default employeeAvatar;
