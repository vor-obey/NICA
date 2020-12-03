import React from 'react';
import { message } from 'antd';
import Player from '../../components/Player/Player';

export default {
  title: 'Player',
  component: Player,
};

const onStart = () => (
  message.info('Video started')
);

const onFinish = () => (
  message.info('Video finished')
);

export const Example = () => <Player onStart={onStart} onFinish={onFinish} />;
