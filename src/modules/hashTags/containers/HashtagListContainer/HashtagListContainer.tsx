import React from 'react';

import { HashtagList } from '../../components/HashtagList';
import { useHashTagsContext } from '../../hooks/useHashTagsContext';

interface HashtagListContainerProps {
  hashtagNames: string[];
}

export const HashtagListContainer: React.FC<HashtagListContainerProps> = ({
  hashtagNames,
}) => {
  const { mapTagNamesOnTags } = useHashTagsContext();
  const [usedHashtags, unusedHashtags] = mapTagNamesOnTags(hashtagNames);

  return (
    <HashtagList usedHashtags={usedHashtags} unusedHashtags={unusedHashtags} />
  );
};
