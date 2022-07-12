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

  return <HashtagList hashtags={hashtagsStore.hashTags} />;
};
