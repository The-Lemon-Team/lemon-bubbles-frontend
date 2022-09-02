import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../common/stores';

import { FloatingList } from '../../components/FloatingList';

export const FloatingListContainer = observer(() => {
  const { settingsStore } = useRootStore();

  return (
    <FloatingList
      sizes={settingsStore.floatingList.sizes.getSizes()}
      position={settingsStore.floatingList.position.getCoordinates()}
      onChangePosition={settingsStore.floatingList.position.setCoordinates}
      onSizeChange={settingsStore.floatingList.sizes.setSizes}
    />
  );
});
