import React, { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { FaPlay } from 'react-icons/fa';

const propTypes = {
  src: PropTypes.string,
  playFullVideo: PropTypes.func.isRequired
};

const defaultProps = {
  src: ''
};

const Video = ({ src, videoId, playFullVideo }) => {
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
        onClick={playFullVideo.bind(this, videoId)}
      >
        <FaPlay className="icon" />
        <span>Full video</span>
      </button>
    </div>
  );
};

Video.propType = propTypes;
Video.defaultProps = defaultProps;

export default React.memo(Video);
