import React from 'react';
import { useRootStore } from '../../../common/stores';

import { HashtagList } from '../../components';

interface HashtagListContainerProps {
  hashtagNames: string[];
}

export const HashtagListContainer: React.FC<HashtagListContainerProps> = ({
  hashtagNames,
}) => {
  const { hashtagsStore } = useRootStore();
  const [usedHashtags, unusedHashtags] =
    hashtagsStore.mapTagNamesOnTags(hashtagNames);

  return (
    <HashtagList usedHashtags={usedHashtags} unusedHashtags={unusedHashtags} />
  );
};
