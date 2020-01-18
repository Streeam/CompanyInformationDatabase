import React, { Fragment, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Card } from 'reactstrap';
import { connect } from 'react-redux';

// tslint:disable
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
// tslint:enable
import { isValid } from 'date-fns';

import { getEntities as getAllNonconformances } from '../../entities/non-conformance-details/non-conformance-details.reducer';
import { getEntities as getAllRejectionReasons } from '../../entities/non-conformance-type/non-conformance-type.reducer';
import { getEntities as getExtraBoms } from '../../entities/extra-boms/extra-boms.reducer';
import { getEntities as getExtraRoutings } from '../../entities/extra-routings/extra-routings.reducer';
import { getEntities as getInternalNonconformance } from '../../entities/internal-non-conformance/internal-non-conformance.reducer';
import { getEntities as getCustomerNonconformances } from '../../entities/client-non-conformance/client-non-conformance.reducer';
import { getAllProductsFromDB } from '../../entities/product/product.reducer';
import { getEntities as getAllSites } from '../../entities/site/site.reducer';
import { getEntities as getAllAfterSaleExpenses } from '../../entities/after-sale-expenses/after-sale-expenses.reducer';
import { IRootState } from 'app/shared/reducers';
import { isArrayEmpty, isEmpty } from 'app/shared/util/general-utils';
import { APP_LOCAL_DATE_FORMAT_2 } from 'app/config/constants';
import { DateUtils } from 'react-day-picker';
import RejectionCodePieChart from './charts/rejection-code-pie/rejection-code-pie-chart';
import NonConformceProgressPieChart from './charts/non-conformace-progress-piechart/non-conformance-progres-pie';
import RejectionCodeInfo from './charts/rejection-code-pie/rejection-code-info-dialog';
import ExpensesLineChart from './charts/expenses-line-chart/expenses-chart';
import SiteStackedBarChart from './charts/non-conformance-site-bar-chart/non-conformance-site-bar-chart';
import { isNull } from 'util';
import { INonConformanceDetails } from 'app/shared/model/non-conformance-details.model';
import { Status } from 'app/shared/model/enumerations/status.model';
import { IClientNonConformance } from 'app/shared/model/client-non-conformance.model';
import { IInternalNonConformance } from 'app/shared/model/internal-non-conformance.model';
import { IAfterSaleExpenses } from 'app/shared/model/after-sale-expenses.model';
import { IProduct } from 'app/shared/model/product.model';

interface INCChartsProps extends StateProps, DispatchProps {}

const NCCharts = (props: INCChartsProps) => {
  const {
    currentUser,
    nonConformances,
    extraBoms,
    extraRoutings,
    allRejectionReasons,
    allInternalNonconformaces,
    allCustomerNonConformaces,
    allProducts,
    allAfterSaleExpenses,
    allSites
  } = props;
  const [fromDate, setFromDate] = useState<Date>(new Date(new Date().getFullYear(), 0, 1));
  const [toDate, setToDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const classes = useStyles(props);

  useEffect(() => {
    if (isArrayEmpty(nonConformances)) {
      props.getAllNonconformances();
    }
    if (isArrayEmpty(allInternalNonconformaces)) {
      props.getInternalNonconformance();
    }
    if (isArrayEmpty(allCustomerNonConformaces)) {
      props.getCustomerNonconformances();
    }
    if (isArrayEmpty(allRejectionReasons)) {
      props.getAllRejectionReasons();
    }
    if (isArrayEmpty(extraBoms)) {
      props.getExtraBoms();
    }
    if (isArrayEmpty(extraRoutings)) {
      props.getExtraRoutings();
    }
    if (isArrayEmpty(allProducts)) {
      props.getAllProductsFromDB();
    }
    if (isArrayEmpty(allAfterSaleExpenses)) {
      props.getAllAfterSaleExpenses();
    }
    if (isArrayEmpty(allSites)) {
      props.getAllSites();
    }
  }, []);
  const productsToSelectFrom = (): IProduct[] => {
    const productList: IProduct[] = [];
    nonConformances && nonConformances.map(nonConformance => nonConformance.products.forEach(product => productList.push(product)));
    return productList;
  };
  const filteredNonConformaces: INonConformanceDetails[] = nonConformances
    ? nonConformances.filter(
        value =>
          new Date(value.currentDate.toString()) >= fromDate &&
          new Date(value.currentDate.toString()) <= toDate &&
          value.status !== Status.INCOMPLETE
      )
    : [];
  const filteredInternalNonConformaces: IInternalNonConformance[] = allInternalNonconformaces
    ? allInternalNonconformaces.filter(
        value =>
          new Date(value.rejectionDate.toString()) >= fromDate &&
          new Date(value.rejectionDate.toString()) <= toDate &&
          value.status !== Status.INCOMPLETE
      )
    : [];
  const filteredCustomerNonConformaces: IClientNonConformance[] = allCustomerNonConformaces
    ? allCustomerNonConformaces.filter(
        value =>
          new Date(value.rejectionDate.toString()) >= fromDate &&
          new Date(value.rejectionDate.toString()) <= toDate &&
          value.status !== Status.INCOMPLETE
      )
    : [];
  const filteredAfterSaleExpenses: IAfterSaleExpenses[] = allAfterSaleExpenses
    ? allAfterSaleExpenses.filter(value => new Date(value.date.toString()) >= fromDate && new Date(value.date.toString()) <= toDate)
    : [];
  const handleRejectionCodeInfoOpen = () => {
    setOpen(true);
  };

  const handleFromDateChange = date => {
    if (isValid(date)) {
      setFromDate(date);
    }
  };
  const handleToDateChange = date => {
    if (isValid(date)) {
      setToDate(date);
    }
  };
  return (
    <Fragment>
      <div className={classes.root}>
        From
        <DayPickerInput
          formatDate={formatDate}
          format={APP_LOCAL_DATE_FORMAT_2}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(fromDate, APP_LOCAL_DATE_FORMAT_2)}`}
          onDayChange={handleFromDateChange}
          onBlur={handleFromDateChange}
          dayPickerProps={{
            showWeekNumbers: true,
            todayButton: 'Today',
            disabledDays: { after: new Date() }
          }}
        />
        To
        <DayPickerInput
          formatDate={formatDate}
          format={APP_LOCAL_DATE_FORMAT_2}
          parseDate={parseDate}
          placeholder={`${dateFnsFormat(toDate, APP_LOCAL_DATE_FORMAT_2)}`}
          onDayChange={handleToDateChange}
          onBlur={handleToDateChange}
          dayPickerProps={{
            showWeekNumbers: true,
            todayButton: 'Today',
            disabledDays: { before: fromDate }
          }}
        />
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Card style={{ margin: '5px 0 5px 0', padding: '1rem' }}>
            {isArrayEmpty(filteredNonConformaces) ? (
              <p style={{ textAlign: 'center', lineHeight: '400px' }}>No Data Provided!</p>
            ) : (
              <Fragment>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <h5 style={{ textAlign: 'left' }}>
                      <strong>Rejection Code</strong>
                    </h5>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div style={{ textAlign: 'right' }}>
                      <IconButton size="small" onClick={handleRejectionCodeInfoOpen} title={`Rejection Codes`} aria-label="rejection codes">
                        <InfoOutlinedIcon fontSize="small" color="primary" />
                      </IconButton>
                    </div>
                  </Grid>
                </Grid>
                <div style={{ height: '400px' }}>
                  <RejectionCodePieChart nonConformances={filteredNonConformaces} />
                </div>
                <RejectionCodeInfo handleClose={setOpen} open={open} allRejectionReasons={[...allRejectionReasons]} />
              </Fragment>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{ margin: '5px 0 5px 0', padding: '1rem' }}>
            {isArrayEmpty(filteredNonConformaces) ? (
              <p style={{ textAlign: 'center', lineHeight: '400px' }}>No Data Provided!</p>
            ) : (
              <Fragment>
                <h5 style={{ textAlign: 'left' }}>
                  <strong>Non-Conformance Progress</strong>
                </h5>
                <div style={{ height: '400px' }}>
                  <NonConformceProgressPieChart nonConformances={filteredNonConformaces} />
                </div>
              </Fragment>
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{ margin: '5px 0 5px 0', padding: '1rem' }}>
            {isArrayEmpty(filteredNonConformaces) ? (
              <p style={{ textAlign: 'center', lineHeight: '400px' }}>No Data Provided!</p>
            ) : (
              <SiteStackedBarChart
                sites={[...allSites]}
                allNonConformaces={[...filteredNonConformaces]}
                internalNonConformaces={[...filteredInternalNonConformaces]}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Card style={{ margin: '5px 0 5px 0', padding: '1rem' }}>
            {isArrayEmpty(filteredNonConformaces) ? (
              <p style={{ textAlign: 'center', lineHeight: '400px' }}>No Data Provided!</p>
            ) : (
              <ExpensesLineChart
                allNonConformaces={filteredNonConformaces}
                allInternalNonConformaces={filteredInternalNonConformaces}
                allCustomerNonconformances={filteredCustomerNonConformaces}
                allAfterSaleExpenses={filteredAfterSaleExpenses}
                allExtraBoms={[...extraBoms]}
                allExtraRoutings={[...extraRoutings]}
                allProducts={[...allProducts]}
              />
            )}
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

const mapStateToProps = ({
  authentication,
  nonConformanceDetails,
  extraBoms,
  extraRoutings,
  nonConformanceType,
  internalNonConformance,
  clientNonConformance,
  product,
  site,
  afterSaleExpenses
}: IRootState) => ({
  currentUser: authentication.account,
  nonConformances: nonConformanceDetails.entities,
  extraBoms: extraBoms.entities,
  extraRoutings: extraRoutings.entities,
  allRejectionReasons: nonConformanceType.entities,
  allInternalNonconformaces: internalNonConformance.entities,
  allCustomerNonConformaces: clientNonConformance.entities,
  allAfterSaleExpenses: afterSaleExpenses.entities,
  allProducts: product.entities,
  allSites: site.entities
});

const mapDispatchToProps = {
  getAllNonconformances,
  getExtraRoutings,
  getExtraBoms,
  getAllRejectionReasons,
  getInternalNonconformance,
  getCustomerNonconformances,
  getAllProductsFromDB,
  getAllSites,
  getAllAfterSaleExpenses
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NCCharts);

const parseDate = (str, format, locale) => {
  const parsed = dateFnsParse(str, format, new Date(), { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
};
const formatDate = (date, format, locale) => dateFnsFormat(date, format, { locale });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(2)
      }
    },
    charts: {
      '& > *': {
        margin: theme.spacing(2),
        height: '300px'
      }
    }
  })
);
