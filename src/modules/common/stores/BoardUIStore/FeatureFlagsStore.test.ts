import { FeatureFlagsStore } from './FeatureFlagsStore';

describe('FeatureFlagsStore', () => {
  it('should check initial values, default values', () => {
    const featureFlagsStore = FeatureFlagsStore.create({
      features: {
        testFeature: true,
      },
    });

    expect({
      testFeature: featureFlagsStore.features.get('testFeature'),
    }).toEqual({ testFeature: true });
  });

  it('getFeature', () => {
    const featureFlagsStore = FeatureFlagsStore.create({
      features: {
        testFeature: true,
      },
    });

    expect(featureFlagsStore.getFeature('testFeature')).toBeTruthy();
  });
});
