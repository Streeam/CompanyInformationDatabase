import React, { useCallback, useMemo, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const MyDropzone = props => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback(filesAdded => {
    setFiles(
      filesAdded.map(file => {
        // console.log(file);
        return { preview: URL.createObjectURL(file) };
      })
    );
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, acceptedFiles } = useDropzone({
    multiple: true,
    accept: 'image/*',
    maxSize: 10000000,
    onDrop
  });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject]
  );
  const thumbs = files.map(file => (
    <div style={thumb} key={file.lastModified}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the attachement here ...</p>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <p>Drag 'n' drop one or multiple images here, or click to select images (maximum total size of images - 15MB)</p>
          </div>
        )}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </div>
  );
};

export default MyDropzone;

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#a6b2bb',
  borderStyle: 'dashed',
  backgroundColor: 'rgb(239, 231, 231)',
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
const thumbsContainer = {
  display: 'flex',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};
