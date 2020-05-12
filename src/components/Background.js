import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { elementInViewport, formatImageUrl } from '../utils/helpers';

const propTypes = {
  backgroundImage: PropTypes.string,
  hasVideo: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.node
};

const defaultProps = {
  className: '',
  backgroundImage: ''
};

const Background = ({ backgroundImage, hasVideo, className, children }) => {
  const [loaded, setLoaded] = useState(false);
  const bgRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!loaded && bgRef.current && elementInViewport(bgRef.current)) {
        const bgUrl = formatImageUrl(backgroundImage, hasVideo);
        bgRef.current.style.backgroundImage = `url(${bgUrl})`;
        setLoaded(true);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loaded, backgroundImage, hasVideo]);

  return (
    <div ref={bgRef} className={`background ${className}`}>
      {children}
    </div>
  );
};

Background.propTypes = propTypes;
Background.defaultProps = defaultProps;

export default React.memo(Background);
