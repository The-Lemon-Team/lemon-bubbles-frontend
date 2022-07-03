import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { HashtagPicker } from '../components/HashtagPicker/HashtagPicker';

import { useRootStore } from '../../common/stores/RootStore';

import { IHashTag } from '../../../interfaces';

interface HashtagPickerContainerProps {
  onChange?: (hashTags: IHashTag[]) => void;
  selected?: IHashTag[];
}

export const HashtagPickerContainer: React.FC<HashtagPickerContainerProps> =
  observer((props: HashtagPickerContainerProps) => {
    const { hashtagsStore } = useRootStore();

    useEffect(() => {
      if (!hashtagsStore.isSucceed && !hashtagsStore.isLoading) {
        hashtagsStore.loadHashTags();
      }
    }, []);

    return <HashtagPicker hashTags={hashtagsStore.hashTags} {...props} />;
  });
