import { useCallback, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './App.scss';
import Dropzone from './components/Dropzone';
import Buttons from './components/Buttons';
import FileContents from './components/FileContents';
import {
  handleFileChange,
  handleFileConvert,
  handleFileDownload,
} from './helpers/apiRequests';

const App = () => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [isFileUploading, setIsFileUploading] = useState<boolean>(false);
  const [isFileConverting, setIsFileConverting] = useState<boolean>(false);
  const [isFileConverted, setIsFileConverted] = useState<boolean>(false);
  const [fileContents, setFileContents] = useState<string | undefined>(
    undefined
  );

  const onDrop = useCallback((acceptedFiles: any) => {
    handleFileChange(setSelectedFile, setIsFileUploading, acceptedFiles);
  }, []);

  const acceptedFormats = {
    'application/msword': ['.docx'],
  };

  return (
    <div>
      <h2>Convert your .docx file into LaTeX file 📁</h2>
      <Dropzone
        onDrop={onDrop}
        accept={acceptedFormats}
        selectedFile={selectedFile}
      />
      <Buttons
        handleFileConvert={() =>
          handleFileConvert(
            setIsFileConverting,
            selectedFile,
            setIsFileConverted,
            setFileContents
          )
        }
        selectedFile={selectedFile}
        handleFileDownload={() => handleFileDownload(selectedFile)}
        isFileConverted={isFileConverted}
      />
      {fileContents && <FileContents fileContents={fileContents} />}
      {isFileUploading && (
        <>
          <p>File is being Uploaded</p>
          <CircularProgress />
        </>
      )}
      {isFileConverting && (
        <>
          <p>File is being Converted</p>
          <CircularProgress />
        </>
      )}
    </div>
  );
};

export default App;
