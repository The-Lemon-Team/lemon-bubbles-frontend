import { useAppSelector } from '../stores/hooks';

export function useFeatureFlag(featureFlag: string) {
  const featureFlags = useAppSelector((state) => state.common.featureFlags);

  return !!featureFlags[featureFlag];
}
