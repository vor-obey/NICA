import React, { useCallback, useState } from 'react';
import ReactPlayer from 'react-player';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import styles from './Player.module.scss';

const config = {
  youtube: {
    playerVars: {
      modestbranding: 1,
      disablekb: 0,
    },
  },
};

const Player = ({ onStart, onFinish, url }) => {
  const [durationVideo, setDurationVideo] = useState(0);
  const [ended, setEnded] = useState(false);
  const [play, setPlay] = useState(false);

  const onPlaying = () => (
    setPlay(!play)
  );

  const renderButton = (
    play
      ? <PauseOutlined onClick={onPlaying} className={styles.playBtn} />
      : <CaretRightOutlined onClick={onPlaying} className={styles.playBtn} />
  );

  const onStartHandle = useCallback(() => {
    if (onStart) onStart();
  }, [onStart]);

  const onFinishHandle = useCallback(() => {
    if (onFinish) onFinish();
  }, [onFinish]);

  return (
    <div className={styles.playerWrapper}>
      {renderButton}
      <ReactPlayer
        controls
        playing={play}
        width="100%"
        height="100%"
        url={url}
        onStart={onStartHandle}
        onEnded={onFinishHandle}
        onProgress={(state) => {
          const percent = durationVideo / 10;
          if (state.playedSeconds >= durationVideo - percent && !ended) {
            setEnded(true);
            onFinish();
          }
        }}
        onDuration={(duration) => setDurationVideo(duration)}
        config={config}
      />
    </div>
  );
};

export default Player;
