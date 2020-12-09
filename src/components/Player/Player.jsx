import React, { useCallback, useState } from 'react';
import ReactPlayer from 'react-player';

const Player = ({ onStart, onFinish, url }) => {
  const [durationVideo, setDurationVideo] = useState(0);
  const [ended, setEnded] = useState(false);

  const _onStart = useCallback(() => {
    if (onStart) onStart();
  }, [onStart]);

  const _onFinish = useCallback(() => {
    if (onFinish) onFinish();
  }, [onFinish]);

  return (
    <ReactPlayer
      width="70%"
      height="60%"
      controls
      url={url}
      onStart={_onStart}
      onEnded={_onFinish}
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
