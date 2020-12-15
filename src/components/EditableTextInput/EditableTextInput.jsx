import _ from 'lodash';
import { Typography } from 'antd';
import React, { useMemo } from 'react';

const { Text } = Typography;

const editableProps = ['onChange', 'icon', 'editing', 'maxLength', 'autoSize', 'onStart', 'tooltip'];

const EditableTextInput = ({
  value, ...props
}) => {
  const editable = useMemo(() => _.pick(props, editableProps), [props]);

  return (
    <Text
      {...props}
      editable={editable}
    >
      {value}
    </Text>
  );
};

export default EditableTextInput;
