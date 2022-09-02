import { types } from 'mobx-state-tree';

import { coordinates } from '../appDefaults';

export const CoordStore = types.snapshotProcessor(
  types
    .model('CoordStore', {
      x: types.number,
      y: types.number,
    })
    .views((self) => ({
      getCoordinates() {
        return {
          x: self.x,
          y: self.y,
        };
      },
    }))
    .actions((self) => ({
      setCoordinates(x: number, y: number) {
        self.x = x;
        self.y = y;
      },
    })),
  {
    preProcessor() {
      const storedData = localStorage.getItem('floatingList_coordinates');
      const restoredCoordinates = storedData && JSON.parse(storedData);

      return restoredCoordinates
        ? { x: +restoredCoordinates.x, y: +restoredCoordinates.y }
        : coordinates;
    },
    postProcessor(snapshot) {
      localStorage.setItem(
        'floatingList_coordinates',
        JSON.stringify(snapshot),
      );

      return snapshot;
    },
  },
);
