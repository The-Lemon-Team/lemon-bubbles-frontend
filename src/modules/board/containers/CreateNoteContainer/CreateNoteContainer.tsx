import React, { useState } from 'react';
import { useFormik, FormikProvider } from 'formik';
import twitterUtils from 'twitter-text';

import { CreateNote } from '../../components/CreateNote';

import { useBoard } from '../../hooks/useBoard';
import { useHashTagAdapter } from './useHashTagAdapter';

import {
  IHashTag,
  INote,
  INoteForm,
  INoteFormikValues,
} from '../../../../interfaces';
import { useHashTags } from '../../../common/hooks/useHashTags';

const inititalFormValues: INoteFormikValues = {
  title: '',
  description: '',
  created: new Date().toString(),
  hashTags: [],
};

function findHashtags(searchText: string) {
  const messageText = searchText.replace(/[{}]{2,}/g, '');

  return twitterUtils.extractHashtags(messageText).reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
  }, [] as string[]);
}

export const CreateNoteContainer: React.FC = () => {
  const {
    editingNote,
    isCreatingMode,
    isEditingMode,
    editNote,
    resetEditMode,
  } = useBoard();
  const { searchHashTags } = useHashTags();
  const [suggestionTags, setSuggestionTags] = useState<IHashTag[]>([]);
  const handleAdd = (payload: INoteFormikValues) => {
    // const hashTags = transformTags(payload.hashTags);
    // const newNote: INote = {
    //   ...payload,
    //   hashTags,
    // };
    // boardStore.addNote(newNote);
  };
  const handleSubmit = (payload: INoteFormikValues) => {
    console.log('submitted');
    if (isCreatingMode) {
      console.log('start creating');
      // handleAdd(payload);
    }

    if (isEditingMode) {
      console.log('start editing');
      // const hashTags = transformTags(payload.hashTags);
      // const note = {
      //   ...payload,
      //   hashTags,
      // };

      // boardStore.editNote(note);
    }

    // formikRef.current?.resetForm();
  };
  const initialValues = editingNote
    ? {
        ...editingNote,
        hashTags: editingNote.hashTags.map((hashTag) => hashTag.text),
      }
    : inititalFormValues;
  const formikBag = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleTextChange = (text?: string) => {
    const hashtags = findHashtags(text || '');

    formikBag.setFieldValue('description', text || '');
    formikBag.setFieldValue('hashTags', hashtags);
  };
  const handleTitleChange = (text?: string) => {
    formikBag.setFieldValue('title', text || '');
  };
  const handleTagsSearch = (value: string) => {
    const foundTags = searchHashTags(value) as IHashTag[];

    setSuggestionTags(foundTags);
  };

  return (
    <FormikProvider value={formikBag}>
      <CreateNote
        usedTags={suggestionTags}
        selectedToEdit={editingNote}
        onSubmit={formikBag.submitForm}
        onReset={resetEditMode}
        onTagsSearch={handleTagsSearch}
        onTextChange={handleTextChange}
        onTitleChange={handleTitleChange}
      />
    </FormikProvider>
  );
};
