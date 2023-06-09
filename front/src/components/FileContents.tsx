import React, { FC } from 'react';

const FileContents: FC<{ fileContents: any }> = ({ fileContents }) => {
  return (
    <div className='contents-div'>
      <h2 className='contents-heading'>LaTeX code:</h2>
      {fileContents.split('\n').map((i: any, key: any) => {
        return (
          <div className='contents-line' key={`${key}_${i}`}>
            <span className='contents-line-number' key={`${i}_${key}`}>
              {key + 1}.{' '}
            </span>
            <p key={key} className='contents-line-text'>
              {i}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default FileContents;
