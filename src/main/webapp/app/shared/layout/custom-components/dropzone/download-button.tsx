import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// tslint:disable
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { ITask } from 'app/shared/model/task.model';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
import { IImage } from 'app/shared/model/image.model';
import { downloadebleAttachment } from 'app/shared/util/entity-utils';
import GetAppIcon from '@material-ui/icons/GetApp';

// tslint:enable

interface IDropzoneProps {
  downloadFile: Function;
  deleteFile: Function;
  entity: IProgressTrack | ITask;
  images: IImage[];
}

const initialStateDownloadMenu = {
  mouseX: null,
  mouseY: null
};
const MyDropzone = (props: IDropzoneProps) => {
  const { entity, images, downloadFile, deleteFile } = props;
  const [downloadMousePosition, setDownloadMousePosition] = useState<{
    mouseX: null | number;
    mouseY: null | number;
  }>(initialStateDownloadMenu);
  const download = (image: IImage) => {
    handleCloseDownloadMenu();
    downloadFile(image.name, image.id);
  };
  const handleRightClickDownloadMenu = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDownloadMousePosition({ mouseX: event.clientX - 2, mouseY: event.clientY - 4 });
  };
  const handleCloseDownloadMenu = () => {
    setDownloadMousePosition(initialStateDownloadMenu);
  };
  const handleRemoveAttachment = (image: IImage) => {
    deleteFile(image.id);
    handleCloseDownloadMenu();
  };
  return (
    <div onContextMenu={handleRightClickDownloadMenu} style={{ cursor: 'context-menu', textAlign: 'center', margin: '3px 0 0 0' }}>
      <IconButton
        size="small"
        // tslint:disable
        onClick={() => download(downloadebleAttachment(entity, [...images]))}
        // tslint:enable
        title={`Download ${downloadebleAttachment(entity, [...images]).name}`}
        aria-label="add"
      >
        <GetAppIcon fontSize="small" />
      </IconButton>
      <Menu
        keepMounted
        open={downloadMousePosition.mouseY !== null}
        onClose={handleCloseDownloadMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          downloadMousePosition.mouseY !== null && downloadMousePosition.mouseX !== null
            ? { top: downloadMousePosition.mouseY, left: downloadMousePosition.mouseX }
            : undefined
        }
      >
        <MenuItem
          // tslint:disable
          onClick={() => download(downloadebleAttachment(entity, [...images]))}
          // tslint:enable
        >
          Download File
        </MenuItem>
        <MenuItem
          // tslint:disable
          onClick={() => handleRemoveAttachment(downloadebleAttachment(entity, [...images]))}
          // tslint:enable
        >
          Remove File
        </MenuItem>
      </Menu>
    </div>
  );
};

export default MyDropzone;
