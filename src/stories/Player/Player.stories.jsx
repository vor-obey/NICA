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

// const url = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
const url = 'https://www.youtube.com/watch?v=ysz5S6PUM-U';

export const Example = () => <Player url={url} onStart={onStart} onFinish={onFinish} />;
