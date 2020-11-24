import React from 'react';
import PropTypes from 'prop-types';
import { Skeleton, Card, Image } from 'antd';

const skeletonAvatar = {
  size: 160,
  shape: 'circle',
};

const PageTitle = ({
  loading, avatar, title, description,
}) => (
  <Skeleton
    active
    loading={loading}
    avatar={skeletonAvatar}
  >
    <Card.Meta
      style={{ display: 'flex', alignItems: 'center' }}
      avatar={<Image width={350} style={{ marginRight: 20 }} src={avatar} />}
      title={title}
      description={description}
    />
  </Skeleton>
);

PageTitle.propTypes = {
  avatar: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  loading: PropTypes.bool.isRequired,
  description: PropTypes.node.isRequired,
};

export default PageTitle;
