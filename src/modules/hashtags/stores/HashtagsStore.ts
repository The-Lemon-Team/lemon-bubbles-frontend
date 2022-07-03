import { types, flow } from 'mobx-state-tree';

import { HashtagStore } from './HashtagStore';
import { hashTagsService } from '../services';

export const HashtagsStore = types
  .model('HashtagsStore', {
    status: types.maybeNull(types.enumeration(['error', 'success', 'loading'])),
    hashTags: types.array(HashtagStore),
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
