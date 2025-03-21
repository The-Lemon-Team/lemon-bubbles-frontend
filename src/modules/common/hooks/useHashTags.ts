import { useEffect } from 'react';

import { IHashTag } from '../../../interfaces';

import { generateHashTag } from '../api/dev/hashTags.mock';
import { useLazyLoadAllTagsQuery } from '../../board/api/hashTagsApi';

const mapTagNamesOnTags = (
  hashTagsData: IHashTag[] = [],
  tagNames: string[],
) => {
  const usedHashTags = tagNames.reduce(
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

  return usedHashTags;
};

const prepareHashtagsToUpload = (
  hashtagsData: IHashTag[],
  hashTagStrings: string[],
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
  const [loadAllTags, { data = [] }] = useLazyLoadAllTagsQuery();

  useEffect(() => {
    loadAllTags();
  }, []);

  const mapHashTags = (tagNames: string[]) => mapTagNamesOnTags(data, tagNames);
  const searchHashTags = (value: string) =>
    data.filter((hashTag) => hashTag.text.startsWith(value));
  const transformTags = (hashTagStrings: string[]) =>
    prepareHashtagsToUpload(data, hashTagStrings);

  return {
    tags: data,
    searchHashTags,
    transformTags,
    mapTagNamesOnTags: mapHashTags,
  };
};
