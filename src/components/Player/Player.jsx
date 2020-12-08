import React, { useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ onStart, onFinish, url }) => {
  const [durationVideo, setDurationVideo] = useState(0);
  const [ended, setEnded] = useState(false);

  return (
    <ReactPlayer
      width="70%"
      height="60%"
      controls
      url={url}
      onStart={() => onStart()}
      onEnded={() => onFinish()}
      onProgress={(state) => {
        const percent = durationVideo / 10;
        if (state.playedSeconds >= durationVideo - percent && !ended) {
          setEnded(true);
          onFinish();
        }
      }}
      onDuration={(duration) => setDurationVideo(duration)}
    />
  );
};

export default Player;
