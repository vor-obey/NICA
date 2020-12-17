import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import cn from 'classnames';
import { Input } from 'antd';
import PropTypes from 'prop-types';
import styles from './EditableText.module.scss';

const EditableText = ({
  children, onChange, onBlur, onFocus,
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(children);

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  const onChangeInputHandle = useCallback(({ target }) => {
    setValue(target.value);
  }, [setValue]);

  const onFocusInputHandle = useCallback((event) => {
    setIsEdit(true);
    onFocus?.(event);
  }, []);

  const onBlurInputHandle = useCallback((event) => {
    setIsEdit(false);
    onBlur?.(event);
  }, []);

  const classNameValue = useMemo(() => cn({
    [styles.passive]: !isEdit,
  }), [isEdit]);

  return (
    <Input
      value={value}
      className={classNameValue}
      onBlur={onBlurInputHandle}
      onFocus={onFocusInputHandle}
      onChange={onChangeInputHandle}
    />
  );
};

EditableText.propTypes = {
  children: PropTypes.string,
};

EditableText.defaultProps = {
  children: '',
};

export default EditableText;
