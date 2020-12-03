import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Col } from 'antd';

export default {
  title: 'Player',
};

export const Player = () => {
  const [progress, setProgress] = useState(0);
  const [durationVideo, setDurationVideo] = useState(0);

  useEffect(() => {
    const percent = durationVideo / 10;
    if (durationVideo - progress <= percent) {
      console.log('success');
    }
  }, [progress]);

  console.log(durationVideo);
  console.log(progress);
  return (
    <Col style={{ display: 'flex', justifyContent: 'center' }}>
      <ReactPlayer
        url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
        onStart={() => console.log('Ready')}
        onEnded={() => console.log('end')}
        controls
        onProgress={(state) => setProgress(state.playedSeconds)}
        onDuration={(duration) => setDurationVideo(duration)}
      />
    </Col>
  );
};
