import faker from 'faker/locale/en';
import { DASHBOARD_USER_QUERY } from '../layouts/Dashboard/Dashboard';
import { PROFILE_INFO_QUERY } from '../layouts/Dashboard/containers/Index/Index';

const generateProducts = (length) => [...new Array(length)].map((item, index) => ({
  id: index,
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  rider: {
    id: index,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
  },
}));

const generateOrders = (length = 4) => [...new Array(length)].map((item, index) => ({
  id: index,
  date: faker.date.past()
    .toISOString(),
  status: 'paid',
  products: generateProducts(faker.random.number(10, 30)),
}));

const generateAddress = () => ({
  city: faker.address.city(),
  timeZone: faker.address.timeZone(),
});

const pageHeaderMock = {
  request: {
    query: DASHBOARD_USER_QUERY,
    variables: {
      userId: 1,
    },
  },
  result: {
    data: {
      user: {
        id: 1,
        firstName: faker.name.firstName(0),
        lastName: faker.name.lastName(0),
      },
      league: {
        id: 1,
        name: 'Georgia',
        image: 'https://lh3.googleusercontent.com/proxy/RFsZ4vAUEX_iv9hykEq-zSXteoZdufnDY323JQduvfxuIqVDjqQMYgKm-_yYc8tMdxLt40AUmgrMAZ8i8w8CIerRXWGvMNF9C3fYP65o59t7oEkADvw7bmYQrA',
        season: {
          year: 2020,
        },
      },
    },
  },
};

const profileInfoMock = {
  request: {
    query: PROFILE_INFO_QUERY,
    variables: {
      userId: 1,
    },
  },
  result: {
    data: {
      profile: {
        id: 1,
        firstName: faker.name.firstName(0),
        lastName: faker.name.lastName(0),
        email: faker.internet.email(),
        address: generateAddress(),
        orders: generateOrders(),
      },
    },
  },
};
export default [pageHeaderMock, profileInfoMock];
