export const handleFileChange = async (
  setSelectedFile: any,
  setIsFileUploading: any,
  acceptedFiles: any
) => {
  const file = acceptedFiles[0];
  setSelectedFile(file);

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsFileUploading(true);
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('File uploaded successfully! ', data);
      setIsFileUploading(false);
    } catch (error) {
      console.error('Error uploading file:', error);
      setIsFileUploading(false);
    }
  }
};

export const handleFileConvert = async (
  setIsFileConverting: any,
  selectedFile: any,
  setIsFileConverted: any,
  setFileContents: any
) => {
  try {
    setIsFileConverting(true);
    const response = await fetch(
      `http://localhost:3000/getLaTeXFile?fileName=${selectedFile?.name}`,
      {
        method: 'GET',
      }
    );
    if (!response.ok) {
      setIsFileConverting(false);
      throw new Error('Request failed');
    }
    setIsFileConverting(false);
    setIsFileConverted(true);
    await showFileContents(selectedFile, setFileContents);
  } catch (error) {
    console.error('Could not convert file:', { error });
    setIsFileConverting(false);
  }
};
export const showFileContents = async (
  selectedFile: any,
  setFileContents: any
) => {
  try {
    const response = await fetch(
      `http://localhost:3000/download?fileName=${selectedFile?.name.replace(
        '.docx',
        '.tex'
      )}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Error downloading file');
    }

    setFileContents(await response.text());
  } catch (error) {
    console.error(error);
  }
};
export const handleFileDownload = async (selectedFile: any) => {
  try {
    const fileName = `${selectedFile?.name.replace('.docx', '.tex')}`;

    const response = await fetch(
      `http://localhost:3000/download?fileName=${fileName}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error('Error downloading file');
    }

    const url = window.URL.createObjectURL(await response.blob());
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}`;
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
  }
};
