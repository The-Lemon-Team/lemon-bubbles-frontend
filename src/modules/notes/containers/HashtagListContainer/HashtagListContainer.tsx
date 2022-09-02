import React from 'react';
import { useRootStore } from '../../../common/stores';

import { HashtagList } from '../../components';

interface HashtagListContainerProps {
  hashtagNames: string[];
}

export const HashtagListContainer: React.FC<HashtagListContainerProps> = ({
  hashtagNames,
}) => {
  const { boardStore } = useRootStore();
  const [usedHashtags, unusedHashtags] =
    boardStore.hashTagsStore.mapTagNamesOnTags(hashtagNames);

  return (
    <HashtagList usedHashtags={usedHashtags} unusedHashtags={unusedHashtags} />
  );
};
