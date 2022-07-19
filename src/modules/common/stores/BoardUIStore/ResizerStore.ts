import { types } from 'mobx-state-tree';

import { sizes } from '../appDefaults';

export const ResizerStore = types.snapshotProcessor(
  types
    .model('ResizerStore', {
      width: types.number,
      height: types.number,
    })
    .views((self) => ({
      getSizes() {
        return {
          width: self.width,
          height: self.height,
        };
      },
    }))
    .actions((self) => ({
      setSizes(width: number, height: number) {
        self.height = height;
        self.width = width;
      },
    })),
  {
    preProcessor() {
      const storageItem = localStorage.getItem('floatingList_sizes');
      const restoredSizes = storageItem && JSON.parse(storageItem);

      return restoredSizes
        ? {
            width: +restoredSizes.width,
            height: +restoredSizes.height,
          }
        : sizes;
    },
    postProcessor(snapshot) {
      localStorage.setItem('floatingList_sizes', JSON.stringify(snapshot));
      return snapshot;
    },
  },
);
