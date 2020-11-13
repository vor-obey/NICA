import React from 'react';

import { gql } from '@apollo/client';

export const LEAGUE_QUERY = gql`
    query getUserLeague($userId: ID!){
        user(id: $userId){
            id,
            firstName,
            lastName,
            image,
            role,
            league {
                id,
                name,
                season,
                image,
                teams {
                    id,
                    name,
                    birthdate,
                },
                events {
                    id,
                    name,
                    birthdate,
                },
                conferences {
                    id,
                    name,
                    birthdate,
                },
                statistics {
                    name,
                    value
                }
            }
        }
    }
`;

export const League = () => (
  <h1>League</h1>
);

export default League;
