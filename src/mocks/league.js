import faker from 'faker/locale/en';
import { LEAGUE_INFO_QUERY } from '../layouts/Dashboard/containers/LeagueTitle/LeagueTitle';
import { LEAGUE_DASHBOARD_QUERY } from '../layouts/Dashboard/containers/Admins/Admins';
import { LEAGUES_QUERY } from '../layouts/Dashboard/containers/Leagues/LeaguesList';

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
    league: faker.commerce.productName(),
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
          min: 6,
          max: 16,
        })),
        statistics: generateStatistics(3),
      },
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
  result: {
    data: {
      league,
    },
  },
};

const leaguesList = {
  request: {
    query: LEAGUES_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: {
    data: {
      leagues: generateLeagues(20),
    },
  },
};

export default [
  leagueInfoMock,
  leagueDashboardMock,
  leaguesList,
];
