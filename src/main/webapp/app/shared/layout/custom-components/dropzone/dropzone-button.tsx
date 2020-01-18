import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// tslint:disable
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
// tslint:enable

interface IDropzoneProps {
  updateWithAttachment: Function;
}

const MyDropzone = (props: IDropzoneProps) => {
  const { updateWithAttachment } = props;
  const [attachement, setAttachement] = useState<File>(null);
  const onDrop = useCallback(filesAdded => {
    setAttachement(filesAdded[0]);
    updateWithAttachment(filesAdded[0]);
  }, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: false,
    maxSize: 10000000,
    onDrop
  });
  return (
    <div className="container">
      <div {...getRootProps()}>
        <input onClick={open} {...getInputProps()} />
        <IconButton size="medium" title={'Upload File'} aria-label="upload">
          <PublishIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default MyDropzone;
