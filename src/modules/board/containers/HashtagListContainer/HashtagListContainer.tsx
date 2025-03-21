import React from 'react';

import { HashtagList } from '../../components';
import { useHashTags } from '../../../common/hooks/useHashTags';

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
