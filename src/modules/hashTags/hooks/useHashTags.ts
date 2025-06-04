import { generateHashTag } from '../../common';
import { useLoadAllTagsQuery } from '../api/hashTagsApi';

import { IHashTag } from '../../../interfaces';

const mapTagNamesOnTags = (
  hashTagsData: IHashTag[] = [],
  tagNames: string[] = [],
) => {
  return tagNames.reduce(
    (acc, cur) => {
      const usedHashtag: IHashTag | undefined = hashTagsData?.find(
        (hashTag) => hashTag.text === cur,
      );

      if (usedHashtag) {
        return [[...acc[0], usedHashtag], acc[1]] as [IHashTag[], string[]];
      }

      return [acc[0], [...acc[1], cur]] as [IHashTag[], string[]];
    },
    [[], []] as [IHashTag[], string[]],
  );
};

const prepareHashtagsToUpload = (
  hashtagsData = [] as IHashTag[],
  hashTagStrings = [] as string[],
) => {
  const [hashTags, unusedTags] = mapTagNamesOnTags(
    hashtagsData,
    hashTagStrings,
  );
  const generatedTags = unusedTags.map((text) =>
    generateHashTag({ text, id: undefined }),
  );

  return [...hashTags, ...generatedTags];
};

export const useHashTags = () => {
  const { data, refetch } = useLoadAllTagsQuery();

  const mapHashTags = (tagNames: string[]) => mapTagNamesOnTags(data, tagNames);
  const searchHashTags = (value: string) =>
    data?.filter((hashTag) => hashTag.text.startsWith(value));
  const transformTags = (hashTagStrings: string[]) =>
    prepareHashtagsToUpload(data, hashTagStrings);
  // @todo возможно пригодиться для оптимизации
  // const getHashTags = () => data;

  return {
    tags: data,
    refreshTags: refetch,
    searchHashTags,
    transformTags,
    mapTagNamesOnTags: mapHashTags,
  };
};
