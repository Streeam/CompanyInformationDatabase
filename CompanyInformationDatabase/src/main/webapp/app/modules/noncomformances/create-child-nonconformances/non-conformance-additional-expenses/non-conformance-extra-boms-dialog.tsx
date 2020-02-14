import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
// tslint:disable
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import CheckIcon from '@material-ui/icons/Check';
// tslint:enable
import { Spinner, Button } from 'reactstrap';
import { isNull } from 'util';
import { IRootState } from 'app/shared/reducers';
import { getAllProductsFromDB } from '../../../../entities/product/product.reducer';
import { IExtraBoms } from 'app/shared/model/extra-boms.model';
import { Nonconformance } from 'app/shared/model/enumerations/nonconformance.model';
import { NonconformanceAction } from 'app/shared/model/enumerations/nonconformance-action.model';
import { isArrayEmpty } from 'app/shared/util/general-utils';
import { IProduct } from 'app/shared/model/product.model';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 'auto',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #000',
      boxShadow: theme.shadows[1],
      padding: theme.spacing(2, 4, 3)
    }
  })
);
interface IFilterBomsModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleClose: () => void;
  nonConformanceIdType: { type: Nonconformance; id: number };
  createExtraBoms: Function;
  allProducts: IProduct[];
}
export const FilterBomsModal = (props: IFilterBomsModalProps) => {
  const { open, setOpen, handleClose, nonConformanceIdType, allProducts } = props;
  useEffect(() => {}, []);
  const classes = useStyles(props);
  const [modalStyle] = useState(getModalStyle);
  const [gridApi, setGridApi] = useState(null);
  const [emptyList, setEmptyList] = useState(false);
  const [nonNumeric, setNonNumeric] = useState(false);
  const [nonZero, setNonZero] = useState(false);
  const [columnHeaders, setcolumnHeaders] = useState([
    { headerName: 'Part Number', field: 'partNumber', resizable: true, sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Part Description', field: 'partDescription', resizable: true, sortable: true, filter: true },
    { headerName: 'Quatity', field: 'quantity', resizable: true, sortable: true, editable: true },
    { headerName: 'Price', field: 'price', resizable: true, sortable: true }
  ]);

  const onGridReady = params => {
    setGridApi(params.api);
    const gridColumnApi = params.columnApi;
    const allColumnIds = [];
    gridColumnApi.getAllColumns().forEach(column => {
      allColumnIds.push(column.colId);
    });
    gridColumnApi.autoSizeColumns(allColumnIds);
  };

  const extractProducts = (): any[] => {
    return allProducts && allProducts.length > 0
      ? allProducts.map(item => ({
          partNumber: item.partNumber,
          partDescription: item.partDescription,
          quantity: 0,
          price: item.latestUnitMaterialCost.toFixed(2)
        }))
      : [];
  };

  const handleOk = e => {
    gridApi.stopEditing();
    setEmptyList(false);
    setNonNumeric(false);
    setNonZero(false);
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(selectedNode => selectedNode.data);
    if (selectedData.length === 0) {
      setEmptyList(true);
    } else {
      selectedData.forEach(objectNode => {
        if (objectNode.quantity <= 0) {
          setNonZero(true);
        } else if (isNaN(objectNode.quantity)) {
          setNonNumeric(true);
        } else {
          const sum = objectNode.quantity * objectNode.price;
          const copyObjectNode = { ...objectNode };
          copyObjectNode['sum'] = sum.toFixed(2);
          saveExtraBoms(objectNode);
          setOpen(false);
        }
      });
    }
  };
  const saveExtraBoms = bom => {
    const extraBomsToSave: IExtraBoms = {
      partNumber: bom.partNumber,
      partDescription: bom.partDescription,
      price: bom.price,
      quantity: bom.quantity,
      nonconformanceType: nonConformanceIdType.type,
      nonconformanceAction: NonconformanceAction.REWORK,
      internalNonconformanceId:
        nonConformanceIdType && nonConformanceIdType.type === Nonconformance.INTERNAL ? nonConformanceIdType.id : null,
      customerNonConformaceId:
        nonConformanceIdType && nonConformanceIdType.type === Nonconformance.CUSTOMER ? nonConformanceIdType.id : null
    };
    props.createExtraBoms(extraBomsToSave);
  };

  return (
    <div>
      <Modal aria-labelledby="simple-modal-title" aria-describedby="simple-modal-description" open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Select Materials</h2>
          <Paper>
            <div
              className="ag-theme-balham"
              style={{
                height: '500px',
                width: '1300px',
                padding: '10px 10px 10px 10px'
              }}
            >
              <AgGridReact onGridReady={onGridReady} rowSelection="multiple" columnDefs={columnHeaders} rowData={extractProducts()} />
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button style={{ margin: '0 10px 10px 10px' }} size="sm" onClick={handleOk} color="secondary">
                <CheckIcon />
                &nbsp;<span className="d-none d-md-inline">Ok</span>
              </Button>
            </div>
          </Paper>
          {emptyList && <p style={{ color: 'red' }}>You need to select at least one product!</p>}
          {nonNumeric && <p style={{ color: 'red' }}>The quantity has to be a numeric value!</p>}
          {nonZero && <p style={{ color: 'red' }}>The quantity has to be a non-zero value!</p>}
        </div>
      </Modal>
    </div>
  );
};

export default FilterBomsModal;
