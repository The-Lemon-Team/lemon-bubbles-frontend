import { types } from 'mobx-state-tree';

import { ResizerStore } from './ResizerStore';
import { CoordStore } from './CoordStore';
import { ThemeStore } from './ThemeStore';
import { FeatureFlagsStore } from './FeatureFlagsStore';

const FloatingListStore = types.model('FloatingListStore', {
  position: CoordStore,
  sizes: ResizerStore,
});

export const SettingsStore = types.model('SettingsStore', {
  floatingList: FloatingListStore,
  themeStore: ThemeStore,
  featureFlags: FeatureFlagsStore,
});
