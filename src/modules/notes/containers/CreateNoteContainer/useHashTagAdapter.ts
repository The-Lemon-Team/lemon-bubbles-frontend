import { useRootStore } from '../../../common/stores/RootStore';
import { generateHashTag } from '../../../common/api/dev/hashTags.mock';

export const useHashTagAdapter = () => {
  const { boardStore } = useRootStore();

  const transformTags = (hashTagStrings: string[]) => {
    const [hashTags, unusedTags] =
      boardStore.hashTagsStore.mapTagNamesOnTags(hashTagStrings);
    const generatedTags = unusedTags.map((text) =>
      generateHashTag({ text, id: undefined }),
    );

    return [...hashTags, ...generatedTags];
  };

  return { transformTags };
};
