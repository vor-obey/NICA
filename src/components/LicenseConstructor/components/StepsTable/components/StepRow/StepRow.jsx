import _ from 'lodash';
import React, {
  useRef, useMemo, useContext,
} from 'react';
import cn from 'classnames';
import { useDrag, useDrop } from 'react-dnd';
import styles from './StepRow.module.scss';
import LevelContext from '../../LevelContext';

const STEP_ROW_TYPE = 'StepRow';

const StepRow = ({
  id, index, moveRow, className, ...restProps
}) => {
  const ref = useRef();
  const { levelIndex } = useContext(LevelContext);
  const [{ isDragging, canDrag }, drag] = useDrag({
    item: {
      id,
      type: STEP_ROW_TYPE,
      index,
      moveRow,
      levelIndex,
    },
    canDrag: () => !_.isUndefined(id),
    collect: (monitor) => ({
      canDrag: monitor.canDrag(),
      isDragging: monitor.isDragging(),
    }),
    isDragging: (monitor) => id === monitor.getItem().id && !monitor.didDrop(),
  });

  const [{ isOver }, drop] = useDrop({
    accept: STEP_ROW_TYPE,
    hover: (item) => {
      if (item.id === id || !ref.current) return;
      if (id) {
        item.moveRow({
          drag: {
            stepIndex: item.index,
            levelIndex: item.levelIndex,
          },
          drop: {
            stepIndex: index,
            levelIndex,
          },
        });
        // eslint-disable-next-line no-param-reassign
        item.index = index;
        // eslint-disable-next-line no-param-reassign
        item.levelIndex = levelIndex;
      }
    },
    collect: (monitor) => {
      const { id: draggingId } = monitor.getItem() || {};
      if (id === draggingId) return {};
      return { isOver: monitor.isOver() };
    },
    drop: (item) => {
      if (canDrag) return;
      item.moveRow({
        drag: {
          stepIndex: item.index,
          levelIndex: item.levelIndex,
        },
        drop: {
          stepIndex: index,
          levelIndex,
        },
      });
    },
  });

  if (canDrag) {
    drop(ref);
  } else {
    drop(drag(ref));
  }

  const classNameValue = useMemo(() => cn(className, {
    [styles.stepRow]: canDrag,
    [styles.invisible]: isDragging,
    [styles.dropEmptyContainer]: isOver && !canDrag,
  }), [isOver, canDrag, isDragging]);

  return (
    <tr
      ref={ref}
      className={classNameValue}
      {...restProps}
    />
  );
};

export default StepRow;
