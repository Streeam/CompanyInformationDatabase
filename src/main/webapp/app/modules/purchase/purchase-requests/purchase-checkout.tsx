import React, { useEffect, useState, Fragment } from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { AgGridReact } from 'ag-grid-react';
// tslint:disable
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import SendIcon from '@material-ui/icons/Send';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// tslint:enable
import { IRootState } from 'app/shared/reducers';
import { getAllProductBoms as getProductsBoms, getAllProductsFromDB } from '../../../entities/product/product.reducer';
import { createEntity as createPurchaseRequestChild } from '../../../entities/purchase-request-parent/purchase-request-parent.reducer';
import { IPurchaseRequestChild } from 'app/shared/model/purchase-request-child.model';
import moment from 'moment';
import { PurchaseRequestStatus } from 'app/shared/model/enumerations/purchase-request-status.model';
import { IPurchaseRequestParent } from 'app/shared/model/purchase-request-parent.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';

interface IPurchaseCheckoutProps extends StateProps, DispatchProps {
  checkoutProducts: any[];
  setCheckoutProducts: React.Dispatch<React.SetStateAction<any[]>>;
}

export const purchaseCheckout = (props: IPurchaseCheckoutProps) => {
  const { allProducts, checkoutProducts, currentEmployee, setCheckoutProducts } = props;
  const [gridApi, setGridApi] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const [nonNumericNonZero, setNonNumericNonZero] = useState(false);
  useEffect(() => {
  }, []);

  const [columnHeaders, setcolumnHeaders] = useState([
    { headerName: 'Part Number', field: 'partNumber', width: 150, resizable: true, sortable: true, filter: true, checkboxSelection: true, editable: true },
    { headerName: 'Part Description', field: 'partDescription', width: 500, resizable: true, sortable: true, filter: true, editable: true },
    { headerName: 'Reference', field: 'reference', resizable: true, sortable: true, width: 100, editable: true },
    {
      headerName: 'Require Date',
      field: 'requireDate',
      resizable: true,
      sortable: true,
      width: 100,
      filter: 'agDateColumnFilter',
      editable: true,
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;
          if (dateAsString == null) return -1;
          const dateParts = dateAsString.split(' ');
          const cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
          if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
            return 0;
          }
          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }
          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      }
    },
    { headerName: 'Quatity', field: 'quantity', resizable: true, sortable: true, width: 100, editable: true }
  ]);

  const onGridReady = params => {
    setGridApi(params.api);
  };
  const createDefaultParentPurchaseRequest = (purchaseRequestItems: any[]): IPurchaseRequestParent => {
    // Create an default entity
    const today = new Date();
    const childComponents: IPurchaseRequestChild[] = [];
    purchaseRequestItems.forEach(item => {
      childComponents.push({
        quantity: item.quantity,
        orderedDate: moment(moment(today).format('YYYY-MM-DD')),
        dueDate: moment(moment(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7)).format('YYYY-MM-DD')),
        commited: true,
        status: PurchaseRequestStatus.PENDING,
        comment: item.reference,
        productId: allProducts.find(element => element.partNumber === element.partNumber) ?
        allProducts.find(itemProduct => itemProduct.partNumber === itemProduct.partNumber).id : null,
        purchaseRequestParentId: 0,
        salesOrderId: null
      });
    });
    return { pdfURLPath: 'test', employeeId: currentEmployee.id, purchaseRequestChildren: childComponents };
  };

  const handleOk = e => {
    gridApi.stopEditing();
    setNonNumericNonZero(false);
    const selectedNodes = gridApi.getSelectedNodes();
    let isValid = true;
    gridApi.forEachNode(objectNode => {
        if (objectNode.data.quantity <= 0 || isNaN(objectNode.data.quantity)) {
          setNonNumericNonZero(true);
          isValid = false;
        }
      });
      if (isValid) {
        const purchaseRequestToSubmit: IPurchaseRequestParent = createDefaultParentPurchaseRequest(checkoutProducts);
        // props.createPurchaseRequestChild(purchaseRequestToSubmit);
        // console.log(purchaseRequestToSubmit);
        setCheckoutProducts([]);
        setEmailSent(true);
      }

  };
  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setEmailSent(false);
  };
  return (
    <Fragment>
            <div
              className="ag-theme-balham"
              style={{
                height: '35vh',
                width: 'auto',
                padding: '1px'
              }}
            >
              <AgGridReact onGridReady={onGridReady} rowSelection="single" columnDefs={columnHeaders} rowData={checkoutProducts} />
            </div>
            {
              !isArrayEmpty(checkoutProducts) &&
            <div style={{ textAlign: 'right' }}>
              <IconButton
                size="small"
                title={'Submit'}
                onClick={handleOk}
                aria-label="add"
              >
                <SendIcon />
              </IconButton>
            </div>
            }
            <Snackbar
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            key={`non-numeric-non-zero-snackbar`}
            open={nonNumericNonZero}
            // tslint:disable-next-line
            onClose={() => setNonNumericNonZero(false)}
            ContentProps={{
              'aria-describedby': 'message-id'
            }}
            message={<span id="message-id">The quantity of all items has to be a numeric value larger then zero!</span>}
            />
             <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        key={`email-sent-snackbar`}
        open={emailSent}
        onClose={handleClose}
        autoHideDuration={3000}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Email Sent</span>}
        action={
          <Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </Fragment>
  );
};

const mapStateToProps = ({ product, employee }: IRootState) => ({
  allProducts: product.entities,
  currentEmployee: employee.currentEmployeeEntity
});

const mapDispatchToProps = {
  getAllProductsFromDB,
  createPurchaseRequestChild
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(purchaseCheckout);
