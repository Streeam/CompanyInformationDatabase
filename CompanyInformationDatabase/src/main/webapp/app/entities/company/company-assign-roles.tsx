import React, { useEffect } from 'react';
import { Button, Card } from 'reactstrap';
import { Link } from 'react-router-dom';
import { updateEntity as updateRole, getEntities as getAllRoles } from '../roles/roles.reducer';
import { getAllEntities as getAllEmployees } from '../../entities/employee/employee.reducer';
// tslint:disable
import { Table as MaterialTable } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import EmployeeAvatar from '../../shared/util/employeeAvatar';

export interface IRoleProps extends StateProps, DispatchProps {}

const assignRoles = (props: IRoleProps) => {
  const { allEmployees, roleUpdating, employeeLoading, allRoles } = props;
  const updating: boolean = roleUpdating || employeeLoading;

  useEffect(() => {
    if (isArrayEmpty(allEmployees)) {
      props.getAllEmployees();
    }
    if (isArrayEmpty(allRoles)) {
      props.getAllRoles();
    }
  }, []);

  const minWidth = { minWidth: '96px' };

  const toggleRaiseNonconformace = role => () => {
    props.updateRole({ ...role, raiseNonconformace: !role.raiseNonconformace });
  };
  const toggleViewNonconformance = role => () => {
    props.updateRole({ ...role, viewNonconformance: !role.viewNonconformance });
  };
  const toggleEditNonconformance = role => () => {
    props.updateRole({ ...role, editNonconformance: !role.editNonconformance });
  };
  const toggleViewTasks = role => () => {
    props.updateRole({ ...role, viewNonconformanceTasks: !role.viewNonconformanceTasks });
  };
  const toggleEditTasks = role => () => {
    props.updateRole({ ...role, editNonconformanceTasks: !role.editNonconformanceTasks });
  };
  const toggleDeleteTasks = role => () => {
    props.updateRole({ ...role, deleteNonconformanceTasks: !role.deleteNonconformanceTasks });
  };
  const toggleDeleteNonconformance = role => () => {
    props.updateRole({ ...role, deleteNonconformance: !role.deleteNonconformance });
  };
  const toggleAddProduct = role => () => {
    props.updateRole({ ...role, addProduct: !role.addProduct });
  };
  const toggleDeleteProduct = role => () => {
    props.updateRole({ ...role, deleteProduct: !role.deleteProduct });
  };
  const toggleEditProduct = role => () => {
    props.updateRole({ ...role, editProduct: !role.editProduct });
  };
  const toggleRaiseTask = role => () => {
    props.updateRole({ ...role, raiseTask: !role.raiseTask });
  };
  const toggleAddProgressTrack = role => () => {
    props.updateRole({ ...role, addProgressTrack: !role.addProgressTrack });
  };
  const toggleDeleteProgressTrack = role => () => {
    props.updateRole({ ...role, deleteProgressTrack: !role.deleteProgressTrack });
  };
  const toggleEditProgressTrack = role => () => {
    props.updateRole({ ...role, editProgressTrack: !role.editProgressTrack });
  };
  const toggleViewProgressTrack = role => () => {
    props.updateRole({ ...role, viewProgressTrack: !role.viewProgressTrack });
  };
  const toggleAddNonConformaceReason = role => () => {
    props.updateRole({ ...role, addNonConformanceReason: !role.addNonConformanceReason });
  };
  const toggleAddRootCause = role => () => {
    props.updateRole({ ...role, addRootCauses: !role.addRootCauses });
  };
  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <MaterialTable size="small" aria-label="a dense table">
        <TableHead>
          <TableRow hover>
            <TableCell>Roles</TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                <EmployeeAvatar maxHeight="30px" employee={employee} />
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Raise Nonconformace
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.raiseNonconformace ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleRaiseNonconformace(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleRaiseNonconformace(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              View Nonconformance
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.viewNonconformance ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleViewNonconformance(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleViewNonconformance(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Edit Nonconformance
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.editNonconformance ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleEditNonconformance(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleEditNonconformance(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Delete Non-Conformance
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.deleteNonconformance ? (
                  <Button
                    disabled={updating}
                    style={minWidth}
                    size="sm"
                    color="success"
                    onClick={toggleDeleteNonconformance(employee.role)}
                  >
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleDeleteNonconformance(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              View Tasks
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.viewNonconformanceTasks ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleViewTasks(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleViewTasks(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Edit Tasks
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.editNonconformanceTasks ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleEditTasks(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleEditTasks(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Delete Tasks
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.deleteNonconformanceTasks ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleDeleteTasks(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleDeleteTasks(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Add Products
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.addProduct ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleAddProduct(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleAddProduct(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Edit Products
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.editProduct ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleEditProduct(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleEditProduct(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Delete Products
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.deleteProduct ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleDeleteProduct(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleDeleteProduct(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Raise Tasks
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.raiseTask ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleRaiseTask(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleRaiseTask(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Add To-Do Items
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.addProgressTrack ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleAddProgressTrack(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleAddProgressTrack(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Edit To-Do Items
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.editProgressTrack ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleEditProgressTrack(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleEditProgressTrack(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              View To-Do Items
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.viewProgressTrack ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleViewProgressTrack(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleViewProgressTrack(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Delete To-Do Items
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.deleteProgressTrack ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleDeleteProgressTrack(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleDeleteProgressTrack(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Add Non-Conformance Reasons
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.addNonConformanceReason ? (
                  <Button
                    disabled={updating}
                    style={minWidth}
                    size="sm"
                    color="success"
                    onClick={toggleAddNonConformaceReason(employee.role)}
                  >
                    Yes
                  </Button>
                ) : (
                  <Button
                    disabled={updating}
                    style={minWidth}
                    size="sm"
                    color="danger"
                    onClick={toggleAddNonConformaceReason(employee.role)}
                  >
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
          <TableRow hover>
            <TableCell component="th" scope="row">
              Add Root Causes
            </TableCell>
            {allEmployees.map(employee => (
              <TableCell key={employee.id} align="center">
                {employee.role.addRootCauses ? (
                  <Button disabled={updating} style={minWidth} size="sm" color="success" onClick={toggleAddRootCause(employee.role)}>
                    Yes
                  </Button>
                ) : (
                  <Button disabled={updating} style={minWidth} size="sm" color="danger" onClick={toggleAddRootCause(employee.role)}>
                    No
                  </Button>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </MaterialTable>
      <div style={{ maxWidth: '100px', margin: '15px 0 0 0' }}>
        <Button size="sm" tag={Link} id="cancel-save" to={'/company/company-status'} replace color="secondary">
          <FontAwesomeIcon icon="arrow-left" />
          &nbsp;
          <span className="d-none d-md-inline">Back</span>
        </Button>
      </div>
    </Card>
  );
};

const mapStateToProps = ({ employee, roles }: IRootState) => ({
  allEmployees: employee.companysEntities,
  employeeLoading: employee.loading,
  roleUpdating: roles.updating,
  allRoles: roles.entities
});

const mapDispatchToProps = { updateRole, getAllEmployees, getAllRoles };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(assignRoles);
