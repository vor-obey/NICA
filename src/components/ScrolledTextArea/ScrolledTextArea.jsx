import React, {
  useEffect, useState, useRef,
} from 'react';
import { Typography } from 'antd';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './ScrolledTextArea.module.scss';

const { Text } = Typography;

const ScrolledTextArea = ({
  onFinish, children, height,
}) => {
  const [isFinish, setIsFinish] = useState(false);
  const endElem = useRef();
  const container = useRef();
  useEffect(() => {
    if (isFinish) {
      onFinish();
    }
  }, [isFinish]);

  useEffect(() => {
    const { current: currentEnd } = endElem;
    const { current: currentContainer } = container;
    if (currentEnd && currentContainer && !isFinish) {
      const intersectionObserver = new IntersectionObserver(([entry]) => {
        setIsFinish(entry.isIntersecting);
      }, {
        root: currentContainer,
        threshold: [1],
      });
      intersectionObserver.observe(currentEnd);
      return () => {
        intersectionObserver.disconnect();
      };
    }
    return null;
  }, [endElem.current, container.current, isFinish]);

  return (
    <div
      ref={container}
      style={{
        height,
      }}
      className={classNames('ant-card', 'ant-card-bordered', styles.container)}
    >
      <div className="ant-card-body">
        <Text>
          {
            children
          }
        </Text>
        <div ref={endElem} />
      </div>
    </div>
  );
};

ScrolledTextArea.propTypes = {
  onFinish: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ScrolledTextArea.defaultProps = {
  height: 200,
};

export default ScrolledTextArea;
