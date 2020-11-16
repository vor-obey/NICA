import React, { useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import PersonalInfo from '../../components/PersonalInfo/PersonalInfo';
import OrderHistory from '../../components/OrderHistory/OrderHistory';

export const PROFILE_INFO_QUERY = gql`
    query profileInfo($userId: ID!){
        profile(id: $userId){
            id,
            firstName,
            lastName,
            email,
            address {
                city,
                timeZone,
            },
            orders {
                id,
                date,
                status,
                total,
                products {
                    id,
                    name,
                    price,
                    rider {
                        id,
                        firstName,
                        lastName,
                    }
                }
            }
        }
    }
`;

const personalInfoCol = [
  {
    title: 'First Name',
    width: 'auto',
    dataIndex: 'name',
    key: 'naqwqwme',
    fixed: 'left',
  },
  {
    title: 'Last Name',
    width: 'auto',
    dataIndex: 'lastName',
    key: 'lastNqwqwame',
    fixed: 'left',
  },
  {
    title: 'Email',
    width: 'auto',
    dataIndex: 'email',
    key: 'emaqqwqwil',
    fixed: 'left',

  },
  {
    title: 'Time Zone',
    width: 'auto',
    dataIndex: 'timeZone',
    key: 'wqqwqw',
    fixed: 'left',
  },
  {
    title: 'City',
    width: 'auto',
    dataIndex: 'city',
    key: 'city',
    fixed: 'left',
  },
];

const orderHistoryCol = [
  {
    title: 'Product',
    width: '70%',
    dataIndex: 'name',
    key: 'product',
    fixed: 'left',
  },
  {
    title: 'Rider',
    width: '20%',
    dataIndex: 'fullName',
    key: 'reider',
    fixed: 'left',
  },
  {
    title: 'Price',
    width: '10%',
    dataIndex: 'price',
    key: 'price',
    fixed: 'left',
  },
];

const Index = () => {
  const { loading, data } = useQuery(PROFILE_INFO_QUERY, {
    variables: {
      userId: 1,
    },
  });

  useEffect(() => {
    console.dir({
      loading,
      data,

    });
  }, [loading, data]);

  return (
    <>
      <OrderHistory
        name={`${data?.profile?.firstName} ${data?.profile?.lastName}`}
        columns={orderHistoryCol}
        orders={data?.profile?.orders ?? []}
      />
      <PersonalInfo columns={personalInfoCol} data={data?.profile} />
    </>
  );
};

export default Index;
