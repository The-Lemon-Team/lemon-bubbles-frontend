import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';

import { useRootStore } from '../../../common/stores';
import { HashTextArea } from '../../components';

interface HashTextAreaContainerProps {
  value: string;
  onChange: (text?: string) => void;
}

export const HashTextAreaContainer: React.FC<HashTextAreaContainerProps> =
  observer((props) => {
    const { boardStore } = useRootStore();
    const { hashTagsStore } = boardStore;
    const handleSearch = useCallback(
      (query: string) => {
        hashTagsStore.handleSearch(query, {
          excludeDateRange: boardStore.dateRange,
        });
      },
      [boardStore, hashTagsStore],
    );

    return (
      <HashTextArea
        {...props}
        onSearch={handleSearch}
        hashtags={hashTagsStore.takeWithQuery(hashTagsStore.searchValue || '')}
      />
    );
  });
