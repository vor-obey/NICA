import faker from 'faker/locale/en';
import { LEAGUE_QUERY } from '../layouts/Dashboard/containers/League';

const generateEvents = (length) => [...new Array(length)].map((item, index) => ({
  id: index,
  name: faker.name.title(),
  birthdate: faker.date.soon()
    .toISOString(),
}));
const generateConferences = (length) => [...new Array(length)].map((item, index) => ({
  id: index,
  name: faker.name.title(),
  birthdate: faker.date[Math.random() > 0.5 ? 'soon' : 'past'](),
}));

const generateTeams = (length) => [...new Array(length)].map((item, index) => ({
  id: index,
  name: faker.name.findName(),
  birthdate: faker.date.past(),
}));

const generateLeague = () => ({
  id: 1,
  season: {
    year: 2020,
  },
  name: 'Georgia',
  image: 'https://lh3.googleusercontent.com/proxy/RFsZ4vAUEX_iv9hykEq-zSXteoZdufnDY323JQduvfxuIqVDjqQMYgKm-_yYc8tMdxLt40AUmgrMAZ8i8w8CIerRXWGvMNF9C3fYP65o59t7oEkADvw7bmYQrA',
  events: generateEvents(24),
  conferences: generateConferences(14),
  teams: generateTeams(37),
  statistics: [
    {
      name: 'Conferences',
      value: 2,
    },
    {
      name: 'Events',
      value: '24',
    },
    {
      name: 'Coaches',
      value: 613,
    },
    {
      name: 'Teams',
      value: 63,
    },
    {
      name: 'Riders',
      value: '1040 (HS: 526, MS: 514)',
    },
    {
      name: 'TCC Hours',
      value: 2,
    },
  ],
});

const leagueInfo = {
  request: {
    query: LEAGUE_QUERY,
    variables: {
      leagueId: 1,
    },
  },
  result: {
    data: {
      league: generateLeague(),
    },
  },
};

export default [leagueInfo];
