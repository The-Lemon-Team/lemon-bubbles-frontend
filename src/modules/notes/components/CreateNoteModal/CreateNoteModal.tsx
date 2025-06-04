import React from 'react';
import { FormikProvider, useFormik } from 'formik';
import { Button, Modal } from 'rsuite';

import { CreateNote } from '../CreateNote';

import { useNotifier } from '../../../common';
import { useHashTagsContext } from '../../../hashTags';
import { useNoteFormAssets } from '../../hooks/useNoteFormAssets';
import { useCreateNote } from '../../hooks/useCreateNote';

import styles from './CreateNoteModal.module.scss';

import { INoteCreateForm } from '../../../../interfaces';

const initialValues: INoteCreateForm = {
  title: '',
  description: '',
  created: '',
  hashTags: [],
};

interface ICreateNoteModalProps {}

export const CreateNoteModal: React.FC<ICreateNoteModalProps> = () => {
  const { isCreatingMode, createNote, resetCreatingMode } = useCreateNote();
  const { showSuccess } = useNotifier();
  const { transformTags } = useHashTagsContext();

  const handleSubmit = (payload: INoteCreateForm) => {
    const hashTags = transformTags(payload.hashTags || []);

    createNote({
      ...payload,
      created: new Date().toString(),
      title: payload.title || '',
      description: payload.description || '',
      hashTags,
    }).then(() => {
      resetCreatingMode();
      showSuccess(`Запись "${payload.title}" добавлена`);
    });
  };
  const formikBag = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: handleSubmit,
  });

  const {
    suggestionTags,
    handleTagsSearch,
    handleTextChange,
    handleTitleChange,
  } = useNoteFormAssets(formikBag);

  return (
    <FormikProvider value={formikBag}>
      <Modal
        backdrop="static"
        data-testid="createNoteModal"
        size="md"
        keyboard
        onClose={resetCreatingMode}
        open={isCreatingMode}
      >
        <Modal.Body>
          <CreateNote
            usedTags={suggestionTags}
            isEditMode={false}
            onReset={formikBag.resetForm}
            onTagsSearch={handleTagsSearch}
            onTextChange={handleTextChange}
            onTitleChange={handleTitleChange}
          />
        </Modal.Body>

        <Modal.Footer className={styles.footer}>
          <Button
            data-testid="submitBtn"
            appearance="primary"
            onClick={formikBag.submitForm}
          >
            Ok
          </Button>
          <Button onClick={resetCreatingMode} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </FormikProvider>
  );
};
