import faker from 'faker';
import { LICENSES_QUERY } from '../layouts/Dashboard/containers/Licenses/Licenses';
import { LICENSE_STEPS_QUERY } from '../layouts/Dashboard/containers/LicenseSteps/LicenseSteps';
import { QUESTION_TYPE, RESPONSE_TYPE } from '../utils/constants';
import { createQuiz } from '../stories/Quiz/Quiz.stories';

const statuses = ['signed', 'paid', 'passed'];
const generateLeagues = (length) => [...new Array(length)].map((item, index) => ({
  id: `_${index + 1}_`,
  name: `League #${index + 1}`,
  __typename: 'League',
}));
const leagues = generateLeagues(10);

const generateLicenses = (length) => [...new Array(length)].map((item, index) => ({
  id: `_${index + 1}_`,
  level: faker.random.number({
    min: 1,
    max: 3,
  }),
  status: statuses[faker.random.number({
    min: 0,
    max: statuses.length - 1,
  })],
  league: leagues[faker.random.number({
    min: 0,
    max: leagues.length - 1,
  })],
  coach: {
    id: faker.random.uuid(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    __typename: 'User',
  },
  __typename: 'License',
}));

const createData = () => ({
  licenses: generateLicenses(100),
  leagues,
});

const adminLicensesMock = {
  request: {
    query: LICENSES_QUERY,
  },
  newData: () => ({
    data: createData(),
  }),
};

const licenseStepsMock = {
  request: {
    query: LICENSE_STEPS_QUERY,
    variables: {
      licenseId: 1,
    },
  },
  newData: () => ({
    data: {
      steps: [{
        id: 1,
        title: 'Introduction video',
        description: 'See the video to understand our goals',
        type: QUESTION_TYPE.VIDEO,
        data: {
          url: 'https://player.vimeo.com/video/454825064',
        },
        quiz: createQuiz(),
        status: RESPONSE_TYPE.INITIAL,
      },
      {
        id: 2,
        title: 'Upload first aid Certificate',
        description: 'Document upload',
        type: QUESTION_TYPE.FILE_UPLOAD,
        data: {},
        quiz: '',
        status: RESPONSE_TYPE.PENDING,
      },
      {
        id: 3,
        title: 'Coach agreement',
        description: 'Read and confirm the document',
        type: QUESTION_TYPE.AGREEMENT,
        data: {
          document: faker.lorem.words(1000),
        },
        quiz: '',
        status: RESPONSE_TYPE.APPROVED,
      },
      ],
    },
  }),
};

export default [adminLicensesMock, licenseStepsMock];
