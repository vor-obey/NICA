import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons';
import styles from './Player.module.scss';

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

  return (
    <div className={styles.playerWrapper}>
      {renderButton}
      <ReactPlayer
        playing={play}
        width="100%"
        height="60%"
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
    </div>
  );
};

export default Player;
