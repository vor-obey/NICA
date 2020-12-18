import _ from 'lodash';
import React, {
  useContext, useMemo, useRef,
} from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import styles from './StepRow.module.scss';
import LevelContext from '../../LevelContext';

const type = 'StepRow';

const StepRow = ({
  stepId,
  stepIndex, className, moveRow, style, ...restProps
}) => {
  const ref = useRef();
  const { levelIndex } = useContext(LevelContext);
  const isEmptyContainer = useMemo(() => _.isUndefined(stepIndex), [stepIndex]);

  const [{ dropClassName, isOver, isMe }, drop] = useDrop({
    accept: type,
    hover: (item) => {
      if (isEmptyContainer) return;
      if (!ref.current) return;
      if (item.stepIndex === stepIndex && item.levelIndex === levelIndex) return;
      item.moveRow(
        {
          drag: {
            stepIndex: item.stepIndex,
            levelIndex: item.levelIndex,
          },
          drop: {
            stepIndex,
            levelIndex,
          },
        },
      );

      // eslint-disable-next-line no-param-reassign
      item.stepIndex = stepIndex;
      // eslint-disable-next-line no-param-reassign
      item.levelIndex = levelIndex;
    },
    collect: (monitor) => {
      const {
        ref: draggingRef,
        stepId: draggingStepId,
        stepIndex: dragStepIndex,
        levelIndex: dragLevelIndex,
      } = monitor.getItem() || {};
      const isMeDragging = stepId === draggingStepId
        && ref?.current !== draggingRef?.current
        && !monitor.didDrop();
      if (dragStepIndex === stepIndex && dragLevelIndex === levelIndex) {
        return {
          isMe: isMeDragging,
        };
      }
      return {
        isMe: isMeDragging,
        isOver: monitor.isOver(),
        dropClassName: cn({
          [styles.dropEmptyContainer]: isEmptyContainer,
        }),
      };
    },
    drop: (item) => {
      if (isEmptyContainer) {
        item.moveRow({
          drag: {
            stepIndex: item.stepIndex,
            levelIndex: item.levelIndex,
          },
          drop: {
            stepIndex,
            levelIndex,
          },
        });
      }
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: {
      type,
      stepId,
      stepIndex,
      levelIndex,
      ref,
      moveRow,
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  if (isEmptyContainer) {
    drop(ref);
  } else {
    drop(drag(ref));
  }

  return (
    <tr
      ref={ref}
      className={cn(className, {
        [dropClassName]: isOver,
        [styles.stepRow]: !isEmptyContainer,
        [styles.invisible]: (isDragging || isMe) && !isEmptyContainer,
      })}
      style={{
        ...style,
        maxWidth: '100%',
      }}
      {...restProps}
    />
  );
};

export default StepRow;
