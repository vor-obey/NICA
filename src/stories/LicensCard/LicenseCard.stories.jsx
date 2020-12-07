import React from 'react';
import { Row } from 'antd';
import faker from 'faker/locale/en';
import LicenseCard from '../../components/LicenseCard/LicenseCard';

export default {
  title: 'LicenseCard',
  component: LicenseCard,
  argTypes: {
    progress: { control: 'range' },
    length: { control: 'number' },
    access: { control: 'boolean' },
  },
};

const img = 'https://i.pinimg.com/originals/33/b8/69/33b869f90619e81763dbf1fccc896d8d.jpg';

export const Example = (args) => (
  <LicenseCard
    image={img}
    access={args.access}
    progress={args.progress}
    license="license name or description"
    level={faker.random.number({ min: 1, max: 6 })}
  />
);

export const arrayCard = (args) => (
  <Row style={{ width: '100%' }}>
    {[...Array(args.length)].map(() => (
      <Example {...args} />
    ))}
  </Row>
);
