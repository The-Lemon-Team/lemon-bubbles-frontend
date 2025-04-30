import React from 'react';

import { HashtagList } from '../../components/HashtagList';
import { useHashTags } from '../../hooks/useHashTags';

interface HashtagListContainerProps {
  hashtagNames: string[];
}

export const HashtagListContainer: React.FC<HashtagListContainerProps> = ({
  hashtagNames,
}) => {
  const { mapTagNamesOnTags } = useHashTags();
  const [usedHashtags, unusedHashtags] = mapTagNamesOnTags(hashtagNames);

  return (
    <HashtagList usedHashtags={usedHashtags} unusedHashtags={unusedHashtags} />
  );
};
