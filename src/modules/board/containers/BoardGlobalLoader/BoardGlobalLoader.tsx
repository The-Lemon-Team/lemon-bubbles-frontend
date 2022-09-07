import { observer } from 'mobx-react-lite';
import { Progress } from 'rsuite';

import { useRootStore } from '../../../common/stores';

import styles from './BoardGlobalLoader.module.scss';

export const BoardGlobalLoader = observer(() => {
  const {
    boardStore: { notesStore },
  } = useRootStore();
  const isLoading = notesStore.deleteLoading.getIsLoading();

  return isLoading ? (
    <Progress.Line
      strokeColor="rgba(52, 152, 255, 0.35)"
      percent={100}
      status="active"
      strokeWidth={4}
      className={styles.wrapper}
      showInfo={false}
    />
  ) : (
    <></>
  );
});
