import React from 'react';
import { Avatar, Card } from 'antd';
import { gql, useQuery } from '@apollo/client';

const USER_QUERY = gql`
    query user{
        id
        firstName
        lastName
        image
    }`;

const HeaderUser = () => {
  const { data } = useQuery(USER_QUERY);

  return (
    <Card>
      <Card.Meta
        avatar={<Avatar src={data?.user?.image} />}
        title={`${data?.user?.firstName} ${data?.user?.lastName}`}
      />
    </Card>
  );
};

export default HeaderUser;
