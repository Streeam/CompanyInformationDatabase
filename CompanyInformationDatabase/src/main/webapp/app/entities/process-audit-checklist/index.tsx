import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProcessAuditChecklist from './process-audit-checklist';
import ProcessAuditChecklistDetail from './process-audit-checklist-detail';
import ProcessAuditChecklistUpdate from './process-audit-checklist-update';
import ProcessAuditChecklistDeleteDialog from './process-audit-checklist-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProcessAuditChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProcessAuditChecklistUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProcessAuditChecklistDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProcessAuditChecklist} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProcessAuditChecklistDeleteDialog} />
  </>
);

export default Routes;
