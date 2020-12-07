import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Col } from 'antd';

const config = {
  youtube: {
    playerVars: {
      disablekb: 1,
    },
  },
};

const Player = ({ onStart, onFinish }) => {
  const [durationVideo, setDurationVideo] = useState(0);
  const [ended, setEnded] = useState(false);

  return (
    <ReactPlayer
      config={config}
      url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
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
