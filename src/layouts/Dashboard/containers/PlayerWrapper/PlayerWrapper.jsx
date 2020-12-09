import React from 'react';
import { message } from 'antd';
import Player from '../../../../components/Player/Player';

const PlayerWrapper = ({ url, onFinish }) => {
  const onStart = () => message.info('Video started');

  return (
    <Player onStart={onStart} onFinish={onFinish} url={url} />
  );
};

export default PlayerWrapper;
