import React, { useCallback } from 'react';
import { gql, useMutation } from '@apollo/client';
import LicenseConstructor from '../../../../components/LicenseConstructor';

const CREATE_LICENSE_MUTATION = gql`
    mutation CreateLicense($input: String!){
        createLicense(input: $input){
            id
        }
    }
`;

const CreateLicense = () => {
  const [createLicense, { called, loading, data }] = useMutation(CREATE_LICENSE_MUTATION);

  const onCreateLicenseHandle = useCallback((values) => {
    createLicense({
      variables: values,
    });
  }, [createLicense]);

  return <LicenseConstructor onCreate={console.log} />;
};

export default CreateLicense;
