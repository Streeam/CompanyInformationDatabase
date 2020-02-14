import React from 'react';
// tslint:disable
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
// tslint:enable
import '../../../../content/css/multi-step.css';
import { connect } from 'react-redux';
import { createEntity } from '../../../entities/company/company.reducer';
import CreateCompany from './create-company';

export const NewCompany = (props: DispatchProps) => {
  const classes = useStyles(props);

  const saveCompany = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = { ...values };
      props.createEntity(entity);
    }
  };

  return (
    <div className={classes.root}>
      <CreateCompany saveCompany={saveCompany} />
    </div>
  );
};

const mapDispatchToProps = { createEntity };

type DispatchProps = typeof mapDispatchToProps;

export default connect(
  null,
  mapDispatchToProps
)(NewCompany);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%'
    }
  })
);
