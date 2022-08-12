import { observer } from 'mobx-react-lite';
import { useRootStore } from '../../../common/stores';

import { FloatingList } from '../../components/FloatingList';

export const FloatingListContainer = observer(() => {
  const { boardUIStore } = useRootStore();

  return (
    <FloatingList
      sizes={boardUIStore.floatingList.sizes.getSizes()}
      position={boardUIStore.floatingList.position.getCoordinates()}
      onChangePosition={boardUIStore.floatingList.position.setCoordinates}
      onSizeChange={boardUIStore.floatingList.sizes.setSizes}
    />
  );
});
