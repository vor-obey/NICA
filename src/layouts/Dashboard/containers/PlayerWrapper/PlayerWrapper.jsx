import React from 'react';
import { message } from 'antd';
import Player from '../../../../components/Player/Player';

const PlayerWrapper = ({ url }) => {
  const onStart = () => message.info('Video started');
  const onFinish = () => message.info('Video finished');

  return (
    <Player onStart={onStart} onFinish={onFinish} url={url} />
  );
};

export default PlayerWrapper;
