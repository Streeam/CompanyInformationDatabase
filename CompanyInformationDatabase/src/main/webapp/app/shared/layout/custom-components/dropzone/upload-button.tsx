import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// tslint:disable
import PublishIcon from '@material-ui/icons/Publish';
import IconButton from '@material-ui/core/IconButton';
import { ITask } from 'app/shared/model/task.model';
import { IProgressTrack } from 'app/shared/model/progress-track.model';
// tslint:enable

interface IDropzoneProps {
  updateWithAttachment: Function;
  progressTrack: IProgressTrack | ITask;
}

const MyDropzone = (props: IDropzoneProps) => {
  const { updateWithAttachment, progressTrack } = props;
  const onDrop = useCallback(filesAdded => {
    updateWithAttachment(progressTrack, filesAdded[0]);
  }, []);

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    multiple: false,
    maxSize: 10000000,
    onDrop
  });
  return (
    <div {...getRootProps()} style={{ textAlign: 'center', margin: '3px 0 0 0' }}>
      <input onClick={open} {...getInputProps()} />
      <IconButton size="small" title={'Upload File'} aria-label="upload">
        <PublishIcon fontSize="small" />
      </IconButton>
    </div>
  );
};

export default MyDropzone;
