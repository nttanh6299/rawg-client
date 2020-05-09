import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  loading: PropTypes.bool.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

const defaultProps = {
  className: '',
  style: {}
};

const Loading = ({ loading, className, style }) => {
  if (!loading) {
    return null;
  }

  return (
    <div className={`loading ${className}`} style={style}>
      <div className="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

Loading.propTypes = propTypes;
Loading.defaultProps = defaultProps;

export default React.memo(Loading);
