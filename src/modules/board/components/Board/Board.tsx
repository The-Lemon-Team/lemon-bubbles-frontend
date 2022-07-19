import { observer } from 'mobx-react-lite';
import { useFeatureFlag } from '../../../common/hooks/useFeatureFlag';
import { FloatingListContainer } from '../../containers';

import styles from './Board.module.scss';

export const Board = observer(() => {
  const isFloatingWindowActivated = useFeatureFlag('floatingWindow');

  return (
    <div className={styles.main}>
      {isFloatingWindowActivated && <FloatingListContainer />}
    </div>
  );
});
