import { types } from 'mobx-state-tree';

export const FeatureFlagsStore = types
  .model('FeatureFlagsStore', {
    features: types.map(types.boolean),
  })
  .views((self) => ({
    getFeature(featureName: string) {
      return self.features.get(featureName);
    },
  }));
