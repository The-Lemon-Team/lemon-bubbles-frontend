import { FloatingListContainer } from '../../containers';

import styles from './Board.module.scss';

export const Board = () => {
  return (
    <div className={styles.main}>
      <FloatingListContainer />
    </div>
  );
};
