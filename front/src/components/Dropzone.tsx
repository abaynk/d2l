// Import the useDropzone hooks from react-dropzone
import { FC } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone: FC<{
  onDrop: any;
  accept: any;
  selectedFile: any;
}> = ({ onDrop, accept, selectedFile }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
  });

  return (
    <div className='dropzone-div' {...getRootProps()}>
      <input className='dropzone-input' {...getInputProps()} />
      <div className='text-center'>
        {selectedFile ? (
          <p>{selectedFile.name}</p>
        ) : isDragActive ? (
          <>
            <p className='dropzone-content'>Release to drop the files here</p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </>
        ) : (
          <>
            <p className='dropzone-content'>
              Drag 'n' drop some files here, or click to select files
            </p>
            <em>(Only *.jpeg and *.png images will be accepted)</em>
          </>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
