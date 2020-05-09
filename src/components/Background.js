import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { elementInViewport } from '../utils/helpers';

const propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  className: ''
};

const Background = ({ backgroundImage, className, children }) => {
  const [loaded, setLoaded] = useState(false);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!loaded && bgRef.current && elementInViewport(bgRef.current)) {
        bgRef.current.style.backgroundImage = `url(${backgroundImage})`;
        setLoaded(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded, backgroundImage]);

  return (
    <div ref={bgRef} className={`background ${className}`}>
      {children}
    </div>
  );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default React.memo(Background);
