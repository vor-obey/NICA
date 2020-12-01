import faker from 'faker/locale/en';
import { LEAGUE_INFO_QUERY } from '../layouts/Dashboard/containers/LeagueTitle/LeagueTitle';
import { LEAGUE_DASHBOARD_QUERY } from '../layouts/Dashboard/containers/Admins/Admins';
import { LEAGUES_QUERY } from '../layouts/Dashboard/containers/Leagues/LeaguesList';
import { LEAGUE_ADMINS_QUERY } from '../layouts/Dashboard/containers/SpecificLeague/components/LeagueAdmins/LeagueAdmins';

const league = {
  id: 1,
  season: {
    id: 1,
    name: '2020',
    __typename: 'Season',
  },
  name: {
    short: 'Utah',
    formal: 'Utah Interscholastic',
  },
  image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
  __typename: 'League',
};

const generate = (mapper) => (length) => [...new Array(length)].map(mapper);

const generateStatistics = generate(() => ({
  title: faker.name.title(),
  value: faker.random.number({
    min: 10,
    max: 10000,
  }),
  __typename: 'Stat',
}));

const generateAdmins = generate((item, index) => {
  const gender = faker.random.number({
    min: 0,
    max: 1,
  });
  return ({
    id: index,
    firstName: faker.name.firstName(gender),
    lastName: faker.name.lastName(gender),
    email: faker.internet.email(),
  });
});

const generateLeagues = generate((item, index) => (
  {
    id: index,
    name: faker.commerce.productName(),
  }
));

const leagueDashboardMock = {
  request: {
    query: LEAGUE_DASHBOARD_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: () => ({
    data: {
      leagueDashboard: {
        ...league,
        riderRegistrationStatus: 'close',
        coachRegistrationStatus: 'open',
        registrationContact: 'Georgia LeagueTitle',
        riderSeasonFeeRegistrationMessage: faker.lorem.sentences(faker.random.number({
          min: 4,
          max: 6,
        })),
        weatherPolicyLink: faker.internet.url(),
        coachLitmosTeam: 'Georgia Coaches',
        timeZone: faker.address.timeZone(),
        createdAt: faker.date.past()
          .toISOString(),
        updatedAt: faker.date.past()
          .toISOString(),
        admins: generateAdmins(faker.random.number({
          min: 10,
          max: 30,
        })),
        statistics: generateStatistics(3),
      },
      role: localStorage.getItem('role'),
    },
  }),
};

const leagueInfoMock = {
  request: {
    query: LEAGUE_INFO_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  newData: () => ({
    data: {
      league: {
        ...league,
        statistics: generateStatistics(3),
      },
    },
  }),
};

const leaguesList = {
  request: {
    query: LEAGUES_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  newData: () => ({
    data: {
      leagues: generateLeagues(20),
    },
  }),
};

const leagueDashboardForAdmin = {
  request: {
    query: LEAGUE_ADMINS_QUERY,
    variables: {
      leagueId: 'superAdminLeagueId',
    },
  },
  result: () => ({
    data: {
      league: {
        id: 'superAdminLeagueId',
        admins: generate((item, index) => {
          const gender = faker.random.number({
            min: 0,
            max: 1,
          });
          return ({
            id: `_${index + 1}`,
            firstName: faker.name.firstName(gender),
            lastName: faker.name.lastName(gender),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumberFormat(),
            role: localStorage.getItem('role'),
          });
        })(100),
      },
    },
  }),
};

export default [
  leagueInfoMock,
  leagueDashboardMock,
  leagueDashboardForAdmin,
  leaguesList,
];
