import React from 'react';
import { useLazyLoadingImage } from '../hooks';
import PropTypes from 'prop-types';

const propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  className: PropTypes.string
};

const defaultProps = {
  className: ''
};

const Background = ({ backgroundImage, className }) => {
  const src = useLazyLoadingImage(backgroundImage);

  return (
    <div
      className={`background ${src ? 'bg-loaded' : ''} ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    ></div>
  );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
