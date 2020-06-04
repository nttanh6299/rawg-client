import React from 'react';
import { useField } from 'formik';

const CustomTextField = ({ placeholder, className, style, ...props }) => {
  const [field, meta] = useField(props);
  const errorText = meta.error && meta.touched ? meta.error : '';

  return (
    <div>
      <input
        className={className}
        style={{ border: `${errorText ? '1px solid #f00' : ''}`, ...style }}
        placeholder={placeholder}
        {...field}
        {...props}
      />
      {errorText && (
        <div
          style={{
            color: '#f00',
            fontWeight: '100',
            fontSize: '1.4rem',
            marginTop: '-1.2rem',
            marginBottom: '1.2rem'
          }}
        >
          {errorText}
        </div>
      )}
    </div>
  );
};

export default CustomTextField;
