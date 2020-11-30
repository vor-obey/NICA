import React from 'react';
import Coach from '../Coach/Coach';
import Admin from '../Admin';
import { permissions } from '../../../../configs/app';
import { USER_ROLE } from '../../../../configs/mock';

const role = USER_ROLE;

const Index = () => (
  <>
    {role === permissions.roles.COACH ? <Coach /> : <Admin /> }
  </>
);

export default Index;
