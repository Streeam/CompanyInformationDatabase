import React from 'react';
import { Button, UncontrolledPopover, PopoverHeader, PopoverBody } from 'reactstrap';
// tslint:disable
import IconButton from '@material-ui/core/IconButton';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
// tslint:enble

const popoverInfo = props => (
  <div>
    <div style={{ textAlign: 'right' }}>
      <IconButton size="small" id="PopoverFocus" title={`Info`} aria-label="add">
        <InfoOutlinedIcon fontSize="small" color="primary" />
      </IconButton>
    </div>
    <UncontrolledPopover trigger="focus" placement="left" target="PopoverFocus">
      <PopoverHeader>{props.popupTitle}</PopoverHeader>
      <PopoverBody>{props.popupBody}</PopoverBody>
    </UncontrolledPopover>
  </div>
);

export default popoverInfo;
