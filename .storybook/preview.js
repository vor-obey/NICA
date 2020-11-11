import React from 'react';
import {addDecorator} from '@storybook/react';
import Center from '../src/components/CenterDecorator/CenterDecorator';

addDecorator(story => <Center>{story()}</Center>)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}