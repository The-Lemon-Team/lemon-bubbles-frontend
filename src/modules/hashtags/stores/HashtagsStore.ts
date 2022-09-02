import { types, flow, castToSnapshot } from 'mobx-state-tree';
import { LoadingStore } from '../../common/stores/LoadingStore';

import { hashTagsService } from '../services';
import { HashTagStore } from './HashTagStore';

import { IDateRange, IHashTag } from '../../../interfaces';

export const HashtagsStore = types
  .model('HashtagsStore', {
    status: types.maybeNull(types.enumeration(['error', 'success', 'loading'])),
    heap: types.array(HashTagStore),
    searchValue: types.maybeNull(types.string),
    loading: LoadingStore,
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
            const usedHashtag: IHashTag | undefined = self.heap.find(
              (hashTag) => hashTag.text === cur,
            );

            if (usedHashtag) {
              return [[...acc[0], usedHashtag], acc[1]] as [
                IHashTag[],
                string[],
              ];
            }

            return [acc[0], [...acc[1], cur]] as [IHashTag[], string[]];
          },
          [[], []] as [IHashTag[], string[]],
        );

        return usedHashTags;
      },
      takeWithQuery(query: string) {
        if (query) {
          const filtered = self.heap.filter((hashTag) => {
            return hashTag.text.startsWith(query);
          });

          return filtered;
        }

        return [];
      },
    };
  })
  .actions((self) => ({
    setHashTags(hashTags: IHashTag[]) {
      self.heap = castToSnapshot(hashTags);
    },
    mergeHashTags: (tags: IHashTag[]) => {
      const unusedTags = tags.filter(
        (tag) => !self.heap.find((heapTag) => tag.id === heapTag.id),
      );

      self.heap.push(...unusedTags);
    },
  }))
  .actions((self) => ({
    handleSearch: flow(function* (
      query: string,
      options: { excludeDateRange: IDateRange },
    ) {
      self.searchValue = query;

      if (query) {
        const foundTags = yield hashTagsService.findHashTags(query, options);

        self.mergeHashTags(foundTags);
      }
    }),
  }));
