import React from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function PhotoWidgetCropper({ setImage, imagePreview }) {
  let cropper;
  const onCropperInit = component => cropper = component;

  const cropImage = () => {
    if (cropper && typeof cropper.getCroppedCanvas() === 'undefined') return;
    cropper.getCroppedCanvas().toBlob((blob) => setImage(blob), 'image/jpeg');
  };

  return (
    <Cropper
      src={ imagePreview }
      style={ { height: 200, width: '100%' } }
      initialAspectRatio={ 1 }
      preview='.img-preview'
      guides={ false }
      viewMode={ 1 }
      dragMode='move'
      scalable={ true }
      cropBoxMovable={ true }
      cropBoxResizable={ true }
      crop={ cropImage }
      onInitialized={ onCropperInit }
    />
  );
};