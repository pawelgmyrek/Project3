import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import window from 'global/window';
import { Image, Transformation } from 'cloudinary-react';

const MAX_IMAGE_SIZE = 6144000; // Maximum Image Size, around 6MB

const SuccessText = styled.div`
  font-size: 115%;
  color: black;
  background-color: #ccff99;
`;

const CloudinaryUploadWidget = (props) => {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { isSubmitted } = props;
  let widgetref = null;

  const cloudPublicId = imgUrl === '' ? '' : imgUrl.slice(imgUrl.lastIndexOf('/') + 1);

  const uploadWidget = (event) => {
    event.preventDefault();
    let widgetClosed = false;
    let cloudinaryWidget;

    const handleSuccessfulImageUpload = (newUrl) => {
      cloudinaryWidget.close({ quiet: true });
      setImageUploaded(true);
      setImgUrl(newUrl);
      props.cloudinaryInfo(newUrl);
      widgetClosed = true;
    };

    // https://cloudinary.com/documentation/upload_widget
    if (!widgetClosed) {
      cloudinaryWidget = window.cloudinary.createUploadWidget({
        multiple: false,
        cropping: true,
        resourceType: 'image',
        maxFileSize: MAX_IMAGE_SIZE,
        cloudName: process.env.REACT_APP_UPLOAD_CLOUDNAME,
        uploadPreset: process.env.REACT_APP_UPLOAD_PRESET,
      }, (error, res) => {
        if (error !== undefined) {
          setErrorMsg(error.toString());
        }
        // handle widget button clicks
        switch (res.event) {
          case 'success':
            handleSuccessfulImageUpload(res.info.secure_url);
            break;
          case 'source-changed':
            cloudinaryWidget.open();
            break;
          case 'abort':
          case 'close':
            widgetClosed = true;
            break;
          default:
            break;
        }
      });
    }
    widgetref.addEventListener('click', () => {
      cloudinaryWidget.open();
    }, false);
  };

  if (imageUploaded && !isSubmitted) {
    return (
      <div>
        <SuccessText>Image Successfully Uploaded</SuccessText>
        <Image
          cloudName={process.env.REACT_APP_UPLOAD_CLOUDNAME}
          publicId={cloudPublicId}
        >
          <Transformation
            width="100"
            height="100"
            gravity="auto"
            crop="thumb"
          />
        </Image>
      </div>
    );
  }

  return (
    <div>
      <button
        ref={(button) => { widgetref = button; }}
        type="submit"
        className="cloudinary-button"
        onClick={uploadWidget}
      >
      Upload Image
      </button>
      {
        errorMsg
        && (
          <p className="bg-danger text-white font-weight-bold">
            {errorMsg}
          </p>
        )
      }
    </div>
  );
};

CloudinaryUploadWidget.propTypes = {
  cloudinaryInfo: PropTypes.func.isRequired,
  isSubmitted: PropTypes.bool.isRequired,
};

export default CloudinaryUploadWidget;
