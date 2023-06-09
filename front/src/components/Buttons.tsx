import React, { FC } from 'react';

const Buttons: FC<{
  handleFileConvert: any;
  selectedFile: any;
  handleFileDownload: any;
  isFileConverted: boolean;
}> = ({
  handleFileConvert,
  selectedFile,
  handleFileDownload,
  isFileConverted,
}) => {
  return (
    <div className='buttons-div'>
      <button
        onClick={handleFileConvert}
        className='convert-button'
        disabled={!selectedFile}
      >
        convert
      </button>
      <button
        onClick={handleFileDownload}
        className='convert-button'
        disabled={!isFileConverted}
      >
        download file
      </button>
    </div>
  );
};

export default Buttons;
