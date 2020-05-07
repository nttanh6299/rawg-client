import React from 'react';
import { useLazyLoadingImage } from '../hooks';
import PropTypes from 'prop-types';

const propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  className: ''
};

const Background = ({ backgroundImage, className, children }) => {
  const src = useLazyLoadingImage(backgroundImage);

  return (
    <div
      className={`background ${className}`}
      style={{ backgroundImage: `url('${src}')` }}
    >
      {children}
    </div>
  );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default Background;
