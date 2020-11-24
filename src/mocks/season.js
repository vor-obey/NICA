import faker from 'faker';
import {
  SEASON_PROPS_QUERY,
} from '../layouts/Dashboard/containers/Season/Season';
import { SEASON_EDIT_PROPS_QUERY } from '../layouts/Dashboard/containers/SeasonEdit/SeasonEdit';

const generate = (mapper) => (length) => [...new Array(length)].map(mapper);

const generateProducts = generate((item, index) => ({
  id: index,
  name: faker.commerce.product(),
  price: faker.commerce.price(),
  __typename: 'Product',
}));

const generateReleasesContactsInfo = generate(() => faker.lorem.lines(2));

const generateRegistration = ({ role, isClosed, isLateFee }) => ({
  role,
  openedAt: faker.date.past()
    .toISOString(),
  closedAt: isClosed ? faker.date.past()
    .toISOString() : null,
  products: generateProducts(faker.random.number(4)),
  lateFee: isLateFee ? {
    name: `NICA ${role} Membership and License Late Fee`,
    startedAt: faker.date[isClosed ? 'past' : 'soon']()
      .toISOString(),
    value: faker.commerce.price(),
  } : false,
  __typename: 'Registration',
});

const seasonMock = {
  request: {
    query: SEASON_PROPS_QUERY,
    variables: {
      seasonId: '1',
    },
  },
  result: () => ({
    data: {
      season: {
        // general information
        id: 1,
        name: '2020',
        startedAt: faker.date.soon()
          .toISOString(),
        divisionsCount: faker.random.number({
          min: 1,
          max: 10,
        }),
        league: {
          id: 1,
          name: {
            short: 'Georgia',
            formal: 'Georgia Interscholastic',
          },
          image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
        },
        // release of contact info
        contactInfoReleases: faker.lorem.lines(2),
        // mad mini info
        riderNewsletterId: faker.random.number({
          min: 1000,
          max: 6000,
        }),
        coachNewsletterId: faker.random.number({
          min: 1000,
          max: 6000,
        }),
        // teen trail corps
        allowCoachesReportTTCHours: false,
        // rider categories
        riderCategories: [
          {
            id: 1,
            ridersCount: 8754,
            name: '6th grade',
          },
          {
            id: 2,
            ridersCount: 8754,
            name: '7th grade',
          },
          {
            id: 3,
            ridersCount: 74,
            name: '8th grade',
          },
          {
            id: 4,
            ridersCount: 8742,
            name: 'Freshman',
          },
          {
            id: 5,
            ridersCount: 9,
            name: 'JV1',
          },
          {
            id: 6,
            ridersCount: 7541,
            name: 'JV2',
          },
          {
            id: 7,
            ridersCount: 38,
            name: 'Varsity',
          },
        ].map((item) => ({
          __typename: 'RiderCategory',
          grades: [4],
          ...item,
        })),
        riderCategoriesAssigmentRules: [
          {
            id: 1,
            grade: 6,
            categoryName: '6th grade',
          },
          {
            id: 2,
            grade: 7,
            categoryName: '7th grade',
          },
          {
            id: 3,
            grade: 8,
            categoryName: '8th grade',
          },
          {
            id: 4,
            grade: 9,
            categoryName: 'Freshman',
          },
          {
            id: 5,
            grade: 10,
            categoryName: 'JV2',
          },
          {
            id: 6,
            grade: 11,
            categoryName: 'JV2',
          },
          {
            id: 7,
            grade: 12,
            categoryName: 'JV2',
          },
        ],

        registrations: [
          generateRegistration({
            role: 'rider',
            isClosed: true,
            isLateFee: false,
          }),
          generateRegistration({
            role: 'admin',
            isClosed: false,
            isLateFee: true,
          }),
          generateRegistration({
            role: 'team',
            isClosed: false,
            isLateFee: true,
          }),
        ],
        events: [
          {
            type: 'Race',
            name: '5 race Series 2020 Season',
            allowedRidersStatus: 'combined',
            date: 'TBD',
            open: false,
            __typename: 'Event',
          },
        ],
        __typename: 'Season',
      },
    },
  }),
};

const seasonEditMock = {
  request: {
    query: SEASON_EDIT_PROPS_QUERY,
    variables: {
      seasonId: '1',
    },
  },
  result: {
    data: {
      season: {
        // general information
        id: '1',
        name: '2020',
        startedAt: faker.date.soon()
          .toISOString(),
        divisionsCount: faker.random.number({
          min: 1,
          max: 10,
        }),
        league: {
          id: 1,
          name: {
            short: 'Georgia',
            formal: 'Georgia Interscholastic',
          },
          image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
        },
        // release of contact info
        contactsInfoReleases: generateReleasesContactsInfo(faker.random.number({
          min: 2,
          max: 6,
        })),
        // mad mini info
        riderNewsletterId: faker.random.number({
          min: 1000,
          max: 6000,
        }),
        coachNewsletterId: faker.random.number({
          min: 1000,
          max: 6000,
        }),
        // teen trail corps
        allowCoachesReportTTCHours: false,
        // rider categories
        riderCategories: [
          {
            id: 1,
            ridersCount: 8754,
            name: '6th grade',
          },
          {
            id: 2,
            ridersCount: 8754,
            name: '7th grade',
          },
          {
            id: 3,
            ridersCount: 74,
            name: '8th grade',
          },
          {
            id: 4,
            ridersCount: 8742,
            name: 'Freshman',
          },
          {
            id: 5,
            ridersCount: 9,
            name: 'JV1',
          },
          {
            id: 6,
            ridersCount: 7541,
            name: 'JV2',
          },
          {
            id: 7,
            ridersCount: 38,
            name: 'Varsity',
          },
          {
            id: 8,
            ridersCount: 0,
            name: 'Sophomore',
          },
        ].map((item) => ({
          __typename: 'RiderCategory',
          grades: [4],
          ...item,
        })),
        riderCategoriesAssigmentRules: [
          {
            id: 1,
            grade: 6,
            categoryName: '6th grade',
          },
          {
            id: 2,
            grade: 7,
            categoryName: '7th grade',
          },
          {
            id: 3,
            grade: 8,
            categoryName: '8th grade',
          },
          {
            id: 4,
            grade: 9,
            categoryName: 'Freshman',
          },
          {
            id: 5,
            grade: 10,
            categoryName: 'JV2',
          },
          {
            id: 6,
            grade: 11,
            categoryName: 'JV2',
          },
          {
            id: 7,
            grade: 12,
            categoryName: 'JV2',
          },
        ],

        registrations: [
          generateRegistration({
            role: 'rider',
            isClosed: true,
            isLateFee: false,
          }),
          generateRegistration({
            role: 'admin',
            isClosed: false,
            isLateFee: true,
          }),
          generateRegistration({
            role: 'team',
            isClosed: false,
            isLateFee: true,
          }),
        ],
        events: [
          {
            type: 'Race',
            name: '5 race Series 2020 Season',
            allowedRidersStatus: 'combined',
            date: 'TBD',
            open: false,
            __typename: 'Event',
          },
        ],
        __typename: 'Season',
      },
    },
  },
};

export default [seasonMock, seasonEditMock];
