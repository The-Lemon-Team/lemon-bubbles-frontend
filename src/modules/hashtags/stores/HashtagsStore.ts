import { types, flow } from 'mobx-state-tree';
import { IHashTag } from '../../../interfaces';

import { hashTagsService } from '../services';

export const HashtagsStore = types
  .model('HashtagsStore', {
    status: types.maybeNull(types.enumeration(['error', 'success', 'loading'])),
    hashTags: types.array(types.frozen()),
  })
  .views((self) => {
    return {
      get isLoading() {
        return self.status === 'loading';
      },
      get isError() {
        return self.status === 'error';
      },
      get isSucceed() {
        return self.status === 'success';
      },
      mapTagNamesOnTags(tagNames: string[]) {
        const usedHashTags = tagNames.reduce(
          (acc, cur) => {
            const usedHashtag: IHashTag = self.hashTags.find(
              (hashTag) => hashTag.text === cur,
            );

            if (usedHashtag) {
              return [[...acc[0], usedHashtag], [...acc[1]]] as [
                IHashTag[],
                string[],
              ];
            }

            return [[...acc[0]], [...acc[1], cur]] as [IHashTag[], string[]];
          },
          [[], []] as [IHashTag[], string[]],
        );

        return usedHashTags;
      },
    };
  })
  .actions((self) => {
    const loadHashTags = flow(function* () {
      self.status = 'loading';
      try {
        self.hashTags = yield hashTagsService.loadHashTags();
        self.status = 'success';
      } catch (error) {
        self.status = 'error';
      }
    });

    return {
      loadHashTags,
    };
  });
