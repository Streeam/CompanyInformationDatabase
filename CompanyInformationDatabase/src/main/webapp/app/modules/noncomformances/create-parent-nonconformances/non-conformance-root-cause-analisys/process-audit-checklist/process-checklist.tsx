import React, { useEffect, CSSProperties, Fragment, useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
// tslint:disable
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { updateEntity as updateProcessAudit } from '../../../../../entities/process-audit-checklist/process-audit-checklist.reducer';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { IProcessAuditChecklist } from 'app/shared/model/process-audit-checklist.model';
// tslint:enable

interface IProcessAuditProps extends StateProps, DispatchProps {}

export const processAuditCheckListComponent = (props: IProcessAuditProps) => {
  const { processAuditCheckList } = props;
  useEffect(() => {}, []);

  const processAuditUpdate = (event, processAuditCheck: IProcessAuditChecklist) => {
    props.updateProcessAudit({ ...processAuditCheck, auditAnswer: event.target.value });
  };
  return (
    <Card style={{ backgroundColor: 'white', margin: '5px 0 5px 0', padding: '1rem' }}>
      <Grid container spacing={1}>
        {!isArrayEmpty(processAuditCheckList) &&
          processAuditCheckList.map(processQuestion => (
            <Fragment key={processQuestion.id}>
              <Grid item xs={12} sm={12}>
                <TextField
                  defaultValue={processQuestion && processQuestion.auditAnswer ? processQuestion.auditAnswer : ''}
                  fullWidth
                  label={processQuestion && processQuestion.auditQuestion ? processQuestion.auditQuestion : ''}
                  // tslint:disable-next-line
                  onBlur={() => processAuditUpdate(event, processQuestion)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
            </Fragment>
          ))}
      </Grid>
    </Card>
  );
};

const mapStateToProps = ({ processAuditChecklist }: IRootState) => ({
  processAuditCheckList: processAuditChecklist.processAuditChecklistOfNC
});

const mapDispatchToProps = { updateProcessAudit };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(processAuditCheckListComponent);
