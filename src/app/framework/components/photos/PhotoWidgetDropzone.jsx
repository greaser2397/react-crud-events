import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

export default function PhotoWidgetDropzone({ setFiles }) {
  const { t } = useTranslation();
  const dropzoneStyles = {
    border: 'dashed 3px #eee',
    borderRadius: '5%',
    paddingTop: '30px',
    textAlign: 'center'
  };

  const dropzoneActive = {
    border: 'dashed 3px green'
  };

  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
    setFiles(acceptedFiles.map(file => Object.assign(file, { preview: URL.createObjectURL(file) })));
    console.log(acceptedFiles);
  }, [setFiles])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  return (
    <div { ...getRootProps() } style={ isDragActive ? { ...dropzoneStyles, ...dropzoneActive } : dropzoneStyles }>
      <input { ...getInputProps() } />
      {
        <>
          <Icon name='upload' size='huge' />
          <Header
            content={ t('profile.imageUploader.hint', { defaultValue: 'Drop your image here' }) }
          />
        </>
      }
    </div>
  )
}