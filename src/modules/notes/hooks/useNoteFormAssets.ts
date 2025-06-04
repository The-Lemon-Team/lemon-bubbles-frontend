import { useState } from 'react';
import { useFormik } from 'formik';
import twitterUtils from 'twitter-text';

import { useHashTagsContext } from '../../hashTags';

import { IHashTag } from '../../../interfaces';

function findHashtags(searchText: string) {
  const messageText = searchText.replace(/[{}]{2,}/g, '');

  return twitterUtils.extractHashtags(messageText).reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
  }, [] as string[]);
}

export const useNoteFormAssets = (
  formikBag: ReturnType<typeof useFormik<any>>,
) => {
  const [suggestionTags, setSuggestionTags] = useState<IHashTag[]>([]);
  const { searchHashTags } = useHashTagsContext();

  const handleTextChange = (text?: string) => {
    const hashTags = findHashtags(text || '');

    formikBag.setFieldValue('description', text || '');
    formikBag.setFieldValue('hashTags', hashTags);
  };
  const handleTitleChange = (text?: string) => {
    formikBag.setFieldValue('title', text || '');
  };
  const handleTagsSearch = (value: string) => {
    const foundTags = searchHashTags(value) as IHashTag[];

    setSuggestionTags(foundTags);
  };

  return {
    suggestionTags,

    handleTextChange,
    handleTitleChange,
    handleTagsSearch,
  };
};
