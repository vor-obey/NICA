import React from 'react';
import { Button } from 'antd';

export default {
  title: 'Button',
  argTypes: { onClick: { action: 'clicked' } },
  component: Button,
};

export const Default = (props) => <Button {...props}>Test</Button>;
