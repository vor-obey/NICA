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
];

const userInfo = [
  {
    key: '1',
    name: 'John',
    address: 'New York Park',
    lastName: 'Brown',
    email: 'example@mail.org',
    timeZone: 'Eastern Time (US & Canada)',
  },
];

const orderHistoryCol = [
  {
    title: 'Product',
    width: 'auto',
    dataIndex: 'product',
    key: 'product',
    fixed: 'left',
  },
  {
    title: 'Price',
    width: 'auto',
    dataIndex: 'price',
    key: 'price',
    fixed: 'left',
  },
];

const orders = [
  {
    id: 'R041182176',
    date: new Date(),
    product: 'As collected deficient objection by it discovery sincerity curiosity',
    price: '$80',
    rider: 'Lucas Dalman',
    paid: true,
  },
  {
    id: 'R041186576',
    date: new Date(),
    product: 'Middleton in objection discovery as agreeable',
    price: '$40',
    rider: 'Lucas Dalman',
    paid: true,
  },
  {
    id: 'R048182176',
    date: new Date(),
    product: 'Imagine was you removal raising gravity',
    price: '$30',
    rider: 'Lucas Dalman',
    paid: false,
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
      <OrderHistory columns={orderHistoryCol} orders={orders} />
      <PersonalInfo columns={personalInfoCol} data={userInfo} />
    </>
  );
};

export default Index;
