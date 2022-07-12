import React from 'react';
import { useRootStore } from '../../../common/stores';

import { HashTextArea } from '../../components';

interface HashTextAreaContainerProps {
  value: string;
  onChange: (text?: string) => void;
}

export const HashTextAreaContainer: React.FC<HashTextAreaContainerProps> = (
  props,
) => {
  const { hashtagsStore } = useRootStore();

  return <HashTextArea {...props} hashtags={hashtagsStore.hashTags} />;
};
