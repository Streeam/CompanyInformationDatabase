import React, { useState, Fragment } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';

import SelectEmployee from '../../../../shared/layout/custom-components/select/select-single-employee';
// tslint:disable
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Transition from '../../../../shared/layout/custom-components/transition/transition';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { isNull } from 'util';
import { INonConformanceType } from 'app/shared/model/non-conformance-type.model';
// tslint:enable

interface IRejectionDialogProps extends StateProps, DispatchProps {
  handleClose: Function;
  allRejectionReasons: INonConformanceType[];
  open: boolean;
}

export const rejectionCodeInfo = (props: IRejectionDialogProps) => {
  const { handleClose, open, allRejectionReasons } = props;
  React.useEffect(() => {}, []);

  const handleExit = () => {
    handleClose(false);
  };
  const rejectionDetailList = (): JSX.Element[] => {
    return allRejectionReasons && allRejectionReasons.map(item => <p key={item.id}>{`${item.rejectionCode}: ${item.rejectionTitle}`}</p>);
  };

  return (
    <Dialog maxWidth="xl" TransitionComponent={Transition} disableEscapeKeyDown open={open} onClose={handleExit}>
      <DialogTitle>Rejection Codes</DialogTitle>
      <DialogContent>
        <Fragment>{rejectionDetailList()}</Fragment>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ employee, progressTrack }: IRootState) => ({
  employeeEntity: employee.entity,
  progressTracks: progressTrack.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(rejectionCodeInfo);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    },
    container: {}
  })
);
