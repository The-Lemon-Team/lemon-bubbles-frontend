import { types } from 'mobx-state-tree';

import { ThemeMode } from '../../../enums';
import { sizes, coordinates, featureFlags } from './appDefaults';

const CoordStore = types.snapshotProcessor(
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

const ResizerStore = types.snapshotProcessor(
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
      const restoredCoordinates = JSON.parse(
        localStorage.getItem('floatingList_sizes') || '',
      );
      return restoredCoordinates
        ? {
            width: +restoredCoordinates.width,
            height: +restoredCoordinates.height,
          }
        : sizes;
    },
    postProcessor(snapshot) {
      localStorage.setItem('floatingList_sizes', JSON.stringify(snapshot));
      return snapshot;
    },
  },
);

const ThemeStore = types.snapshotProcessor(
  types
    .model('ThemeStore', {
      mode: types.enumeration<ThemeMode>('ThemeMode', Object.values(ThemeMode)),
    })
    .views((self) => ({
      get isLightMode() {
        return self.mode === ThemeMode.LIGHT;
      },
      get isDarkMode() {
        return self.mode === ThemeMode.DARK;
      },
    }))
    .actions((self) => ({
      setLightMode() {
        self.mode = ThemeMode.LIGHT;
      },
      setDarkMode() {
        self.mode = ThemeMode.DARK;
      },
      swtichMode() {
        if (self.mode === ThemeMode.DARK) {
          self.mode = ThemeMode.LIGHT;
        } else {
          self.mode = ThemeMode.DARK;
        }
      },
    })),
  {},
);

const FloatingListStore = types.model('FloatingListStore', {
  position: CoordStore,
  sizes: ResizerStore,
});

const FeatureFlagsStore = types
  .model('FeatureFlagsStore', {
    features: types.map(types.boolean),
  })
  .views((self) => ({
    getFeature(featureName: string) {
      return self.features.get(featureName);
    },
  }));

export const BoardUIStore = types.model('BoardUIStore', {
  floatingList: FloatingListStore,
  themeStore: ThemeStore,
  featureFlags: FeatureFlagsStore,
});
