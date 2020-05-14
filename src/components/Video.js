import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { ReactComponent as PlayIcon } from '../images/SVG/play.svg';

const propTypes = {
  src: PropTypes.string,
  onClick: PropTypes.func
};

const defaultProps = {
  src: ''
};

const Video = ({ src, videoId, onClick }) => {
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.volume = 0;
  }, []);

  const handleLoadedData = () => {
    setLoading(false);
    videoRef.current.play();
  };

  return (
    <div className="video">
      <Loading loading={loading} className="video__loading" />
      <video
        ref={videoRef}
        onLoadedData={handleLoadedData}
        className={`video__frame ${!loading ? 'video__frame--play' : ''}`}
        src={src}
        loop
      />
      <button
        className="video__full-frame"
        onClick={onClick.bind(this, videoId)}
      >
        <PlayIcon className="icon" />
        <span>Full video</span>
      </button>
    </div>
  );
};

Video.propType = propTypes;
Video.defaultProps = defaultProps;

export default React.memo(Video);
