import React, { useCallback, useMemo } from 'react';
import { Button, Modal } from 'rsuite';
import { FormikProvider, useFormik } from 'formik';

import { CreateNote } from '../CreateNote';

import { useHashTagsContext } from '../../../hashTags';
import { useNoteFormAssets } from '../../hooks/useNoteFormAssets';

import styles from './EditNoteModal.module.scss';

import { INote, INoteEditForm } from '../../../../interfaces';

interface IEditNoteModalProps {
  editingNote?: INote;
  opened?: boolean;
  disabled?: boolean;

  resetEditId: () => void;
  editNote: (payload: INote) => void;
}

const inititalFormValues: INoteEditForm = {
  id: '',
  title: '',
  description: '',
  created: new Date().toString(),
  hashTags: [],
};

export const EditNoteModal: React.FC<IEditNoteModalProps> = ({
  opened,
  disabled,
  editingNote,
  editNote,
  resetEditId,
}) => {
  const { transformTags } = useHashTagsContext();
  const initialValues = useMemo(
    () => ({
      ...(editingNote || inititalFormValues),
      hashTags: editingNote?.hashTags.map((hashTag) => hashTag.text) || [],
    }),
    [editingNote],
  );

  const handleSubmit = useCallback(
    (payload: INoteEditForm) => {
      const hashTags = transformTags(payload.hashTags || []);

      editNote({
        ...payload,
        title: payload.title || '',
        description: payload.description || '',
        hashTags,
      });
    },
    [transformTags, editNote],
  );
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
      <Modal backdrop="static" size="md" open={opened}>
        <Modal.Body>
          <CreateNote
            isEditMode
            disabled={disabled}
            usedTags={suggestionTags}
            onReset={formikBag.resetForm}
            onTagsSearch={handleTagsSearch}
            onTextChange={handleTextChange}
            onTitleChange={handleTitleChange}
          />
        </Modal.Body>

        <Modal.Footer className={styles.footer}>
          <Button
            appearance="primary"
            onClick={() => formikBag.handleSubmit()}
            disabled={disabled}
          >
            Ok
          </Button>
          <Button onClick={resetEditId} appearance="subtle" disabled={disabled}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </FormikProvider>
  );
};
