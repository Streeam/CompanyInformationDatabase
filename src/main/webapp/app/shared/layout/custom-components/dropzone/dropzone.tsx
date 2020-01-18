import React, { useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

const MyDropzone = props => {
  const { fileName, setAttachement } = props;
  const onDrop = useCallback(filesAdded => {
    setAttachement(filesAdded[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    multiple: false,
    maxSize: 10000000,
    onDrop
  });
  const files = acceptedFiles.map(file => (
    <p key={file.name}>
      {file.name} - {file.size} bytes
    </p>
  ));
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the attachement here ...</p>
        ) : (
          <p>Drag 'n' drop some an attachment here, or click to select an attachment (maximum size 10MB)</p>
        )}
      </div>
      <h5>{files[0] ? files[files.length === 0 ? 0 : files.length - 1] : fileName}</h5>
    </div>
  );
};

export default MyDropzone;
