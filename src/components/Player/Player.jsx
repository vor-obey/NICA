import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { Col } from 'antd';

const Player = ({ onStart, onFinish }) => {
  const [durationVideo, setDurationVideo] = useState(0);
  const [ended, setEnded] = useState(false);

  return (
    <Col style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        onStart={() => onStart()}
        onEnded={() => onFinish()}
        controls
        onProgress={(state) => {
          const percent = durationVideo / 10;
          if (state.playedSeconds >= durationVideo - percent && !ended) {
            setEnded(true);
            onFinish();
          }
        }}
        onDuration={(duration) => setDurationVideo(duration)}
      />
    </Col>
  );
};

export default Player;
