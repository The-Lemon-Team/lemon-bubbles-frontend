import { useRootStore } from '../stores';

export function useFeatureFlag(featureFlag: string) {
  const { settingsStore } = useRootStore();

  return settingsStore.featureFlags.getFeature(featureFlag);
}
