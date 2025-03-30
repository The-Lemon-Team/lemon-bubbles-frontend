import React from 'react';
import { Button, Modal } from 'rsuite';
import { FormikProvider, useFormik } from 'formik';

import styles from './EditNoteModal.module.scss';

import { CreateNote } from '../CreateNote';

import { useHashTags } from '../../../common/hooks/useHashTags';
import { useEditNote } from '../../hooks/useEditNote';
import { useNoteFormAssets } from '../../hooks/useNoteFormAssets';

import { INoteEditForm } from '../../../../interfaces';

interface IEditNoteModalProps {}

const inititalFormValues: INoteEditForm = {
  id: '',
  title: '',
  description: '',
  created: new Date().toString(),
  hashtags: [],
};

export const EditNoteModal: React.FC<IEditNoteModalProps> = () => {
  const { resetEditId, editNote, editId, editingNote } = useEditNote();

  const { transformTags } = useHashTags();
  const initialValues = {
    ...(editingNote || inititalFormValues),
    hashtags: editingNote?.hashtags.map((hashTag) => hashTag.text) || [],
  };

  const handleSubmit = (payload: INoteEditForm) => {
    const hashtags = transformTags(payload.hashtags || []);

    editNote({
      ...payload,
      title: payload.title || '',
      description: payload.description || '',
      hashtags,
    }).then(resetEditId);
  };
  const formikBag = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (values) => handleSubmit(values),
  });
  const {
    suggestionTags,
    handleTagsSearch,
    handleTextChange,
    handleTitleChange,
  } = useNoteFormAssets(formikBag);

  return (
    <FormikProvider value={formikBag}>
      <Modal backdrop="static" size="md" open={!!editId}>
        <Modal.Body>
          <CreateNote
            usedTags={suggestionTags}
            isEditMode
            onReset={formikBag.resetForm}
            onTagsSearch={handleTagsSearch}
            onTextChange={handleTextChange}
            onTitleChange={handleTitleChange}
          />
        </Modal.Body>

        <Modal.Footer className={styles.footer}>
          <Button appearance="primary" onClick={() => formikBag.handleSubmit()}>
            Ok
          </Button>
          <Button onClick={resetEditId} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </FormikProvider>
  );
};
