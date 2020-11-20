import faker from 'faker/locale/en';
import { LEAGUE_TEAMS_QUERY } from '../layouts/Dashboard/containers/Teams/Teams';
import { LEAGUE_EVENTS_QUERY } from '../layouts/Dashboard/containers/Events/Events';
import { LEAGUE_CONFERENCES_QUERY } from '../layouts/Dashboard/containers/Conferences/Conferences';
import { LEAGUE_INFO_QUERY } from '../layouts/Dashboard/containers/League/League';

const league = {
  id: 1,
  season: '2020',
  name: {
    short: 'Georgia',
    formal: 'Georgia Interscholastic',
  },
  image: 'https://www.sefiles.net/merchant/481/images/site/utah-logo.png',
  __typename: 'League',
};

const generate = (mapper) => (length) => [...new Array(length)].map(mapper);

const generateEvents = generate((item, index) => ({
  id: index,
  name: faker.name.title(),
  date: faker.date.soon()
    .toISOString(),
  __typename: 'Event',
}));

const generateConferences = generate((item, index) => ({
  id: index,
  name: faker.name.title(),
  date: faker.date[Math.random() > 0.5 ? 'soon' : 'past'](),
  __typename: 'Conference',
}));

const generateTeams = generate((item, index) => ({
  id: index,
  name: faker.name.findName(),
  createdAt: faker.date.past(),
  __typename: 'Team',
}));

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

const leagueInfo = {
  request: {
    query: LEAGUE_INFO_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: () => ({
    data: {
      league: {
        ...league,
        season: {
          id: 1,
          name: '2020',
        },
        riderRegistrationStatus: 'close',
        coachRegistrationStatus: 'open',
        registrationContact: 'Georgia League',
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

const leagueTeams = {
  request: {
    query: LEAGUE_TEAMS_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: {
    data: {
      league: {
        ...league,

        teams: generateTeams(faker.random.number({
          min: 4,
          max: 60,
        })),
      },
    },
  },
};

const leagueEvents = {
  request: {
    query: LEAGUE_EVENTS_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: {
    data: {
      league: {
        ...league,
        events: generateEvents(faker.random.number({
          min: 4,
          max: 60,
        })),
      },
    },
  },
};

const leagueConferences = {
  request: {
    query: LEAGUE_CONFERENCES_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: () => ({
    data: {
      league: {
        ...league,
        conferences: generateConferences(faker.random.number({
          min: 4,
          max: 60,
        })),
      },
    },
  }),
};

export default [leagueInfo, leagueTeams, leagueEvents, leagueConferences];
