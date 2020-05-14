import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  videoId: PropTypes.string
};

const defaultProps = {};

const FullVideo = ({ onClose, videoId }) => {
  if (!videoId) {
    return null;
  }

  return (
    <div className="full-video">
      <span className="full-video__close" onClick={onClose}>
        &times;
      </span>
      <div className="full-video__frame">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          allowFullScreen
          allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
          title="Youtube video player"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        ></iframe>
      </div>
    </div>
  );
};

FullVideo.propTypes = propTypes;
FullVideo.defaultProps = defaultProps;

export default React.memo(FullVideo);
