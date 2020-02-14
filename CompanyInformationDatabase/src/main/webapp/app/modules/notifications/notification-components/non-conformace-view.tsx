import React, { useState, Fragment, useCallback } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { IRootState } from 'app/shared/reducers';
// tslint:disable
import { makeStyles, Theme, lighten, createStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// tslint:enable

import { PARENTS } from 'app/config/constants';
import { Status } from 'app/shared/model/enumerations/status.model';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { isArrayEmpty, toTitleCase } from 'app/shared/util/general-utils';
import moment from 'moment';

interface INonConformaceProps extends StateProps, DispatchProps {
  notificationType: string;
}

const NonConformance = (props: INonConformaceProps) => {
  const classes = useStyles(props);
  const { notificationType, currentNonconformaces } = props;

  const nonConformaceList = (): INonConformanceDetails[] => {
    switch (notificationType) {
      case PARENTS.NON_CONFORMANCES_COMPLETE:
        return currentNonconformaces ? currentNonconformaces.filter(val => val.status === Status.COMPLETE) : [];
      case PARENTS.NON_CONFORMANCES_PENDING:
        return currentNonconformaces ? currentNonconformaces.filter(value => value.status !== Status.COMPLETE) : [];
      default:
        throw new Error('No such notification type!!');
    }
  };
  return currentNonconformaces.length === 0 ? (
    <h5 style={{ textAlign: 'center', lineHeight: '800px' }}> You've read all the messages in your inbox.</h5>
  ) : (
    <Fragment>
      <Table className={classes.table} aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell align="left">Id</TableCell>
            <TableCell align="left">Non-Conformance</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Rejection Code</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="center">Progress</TableCell>
            <TableCell align="right">Submitted</TableCell>
            <TableCell align="right">Deadline</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {nonConformaceList().map(nonConformance => (
            <TableRow key={nonConformance.id} hover>
              <TableCell align="left">{nonConformance.id}</TableCell>
              <TableCell style={{ width: '50%' }} align="left">
                {!isArrayEmpty(nonConformance.products) && nonConformance.products[0].partNumber}
              </TableCell>
              <TableCell align="left">{toTitleCase(nonConformance.nonconformance)}</TableCell>
              <TableCell align="left">{nonConformance.nonConformanceType.rejectionCode}</TableCell>
              <TableCell align="left">{toTitleCase(nonConformance.status)}</TableCell>
              <TableCell align="center">{nonConformance.progress} %</TableCell>
              <TableCell align="right">{moment(nonConformance.currentDate).format('DD MMM')}</TableCell>
              <TableCell align="right">{moment(nonConformance.deadline).format('DD MMM')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};
const mapStateToProps = ({ nonConformanceDetails }: IRootState) => ({
  currentNonconformaces: nonConformanceDetails.curentEntities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NonConformance);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650
    },
    column: {
      flexBasis: '100%'
    }
  })
);
