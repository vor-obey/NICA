import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import {
  Skeleton, Card, Image, Avatar, Typography,
} from 'antd';
import { CrownOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const imageProps = {
  width: 200,
};

const reduceAvatarSize = (maxSize) => ({
  xs: maxSize * 0.7,
  sm: maxSize * 0.7,
  md: maxSize * 0.7,
  lg: maxSize * 0.8,
  xl: maxSize * 0.9,
  xxl: maxSize,
});

const skeletonProps = {
  active: true,
  paragraph: {
    rows: 1,
    width: 200,
  },
  avatar: {
    size: 160,
    shape: 'circle',
  },
};

const PageTitle = ({
  loading, avatar, title, description,
}) => {
  const avatarImg = useMemo(
    () => (typeof avatar === 'string'
      ? <Image {...imageProps} src={avatar} />
      : <Avatar size={reduceAvatarSize(160)} icon={<CrownOutlined />} />),
    [avatar],
  );
  const titleValue = typeof title === 'string' ? <Title>{title}</Title> : title;
  const descriptionValue = typeof description === 'string'
    ? <Text type="secondary">{description}</Text> : description;

  return (
    <Skeleton {...skeletonProps} loading={loading}>
      <Card.Meta
        avatar={avatarImg}
        title={titleValue}
        description={descriptionValue}
      />
    </Skeleton>
  );
};

PageTitle.propTypes = {
  avatar: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  description: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

PageTitle.defaultProps = {
  avatar: null,
};

export default PageTitle;
