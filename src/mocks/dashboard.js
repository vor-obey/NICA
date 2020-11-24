import faker from 'faker/locale/en';
import { DASHBOARD_USER_QUERY } from '../layouts/Dashboard/Dashboard';

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
        image: faker.image.avatar(),
      },
      league: {
        id: 1,
        name: 'Georgia',
        image: 'https://lh3.googleusercontent.com/proxy/RFsZ4vAUEX_iv9hykEq-zSXteoZdufnDY323JQduvfxuIqVDjqQMYgKm-_yYc8tMdxLt40AUmgrMAZ8i8w8CIerRXWGvMNF9C3fYP65o59t7oEkADvw7bmYQrA',
        season: '2020',
      },
    },
  },
};

export default [pageHeaderMock];
