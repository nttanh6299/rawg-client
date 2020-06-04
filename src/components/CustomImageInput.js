import React, { useRef, useState } from 'react';

const CustomImageInput = ({ name, errorMessage, setFieldValue, field }) => {
  const [file, setFile] = useState();
  const [imageReviewUrl, setImageReviewUrl] = useState();
  const fileUpload = useRef(null);

  const handleImageChange = e => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];

    if (file) {
      reader.onloadend = () => {
        setFile(file);
        setImageReviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setFieldValue(field.name, file);
    }
  };

  const showPreviewImage = () => {
    if (file && !errorMessage) {
      return <img src={imageReviewUrl} className="form__img" alt="avatar" />;
    } else {
      return <span className="form__img"></span>;
    }
  };

  const showFileUpload = () => {
    if (fileUpload) {
      fileUpload.current.click();
    }
  };

  return (
    <div
      style={{ display: 'flex', alignItems: 'center', margin: '0 0 1rem 0' }}
    >
      <div>{showPreviewImage()}</div>
      <input
        hidden
        id={name}
        name={name}
        type="file"
        onChange={handleImageChange}
        ref={fileUpload}
      />
      <button type="button" onClick={showFileUpload} className="form__button">
        Upload
      </button>
      {errorMessage ? (
        <span
          style={{
            marginLeft: '1rem',
            color: '#f00',
            fontWeight: '100',
            fontSize: '1.4rem'
          }}
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default CustomImageInput;
