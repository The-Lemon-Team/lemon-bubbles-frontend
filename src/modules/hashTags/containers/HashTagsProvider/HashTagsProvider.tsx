import React from 'react';
import { useHashTags } from '../../hooks/useHashTags';

export const HashTagsContext = React.createContext<
  ReturnType<typeof useHashTags>
>(null as any);

export const HashTagsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const tagsAssets = useHashTags();

  return (
    <HashTagsContext.Provider value={tagsAssets}>
      {children}
    </HashTagsContext.Provider>
  );
};
