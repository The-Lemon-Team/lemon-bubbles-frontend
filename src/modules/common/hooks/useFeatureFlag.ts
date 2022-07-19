import { useRootStore } from '../stores';

export function useFeatureFlag(featureFlag: string) {
  const { boardUIStore } = useRootStore();

  return boardUIStore.featureFlags.getFeature(featureFlag);
}
