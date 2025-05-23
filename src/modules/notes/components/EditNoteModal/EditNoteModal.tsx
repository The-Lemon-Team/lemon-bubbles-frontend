import React from 'react';
import { Button, Modal } from 'rsuite';
import { FormikProvider, useFormik } from 'formik';

import { CreateNote } from '../CreateNote';

import { useHashTags } from '../../../hashTags/hooks/useHashTags';
import { useNoteFormAssets } from '../../hooks/useNoteFormAssets';

import styles from './EditNoteModal.module.scss';

import { INote, INoteEditForm } from '../../../../interfaces';

interface IEditNoteModalProps {
  editingNote?: INote;
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
  disabled,
  editingNote,
  editNote,
  resetEditId,
}) => {
  const { transformTags } = useHashTags();
  const initialValues = {
    ...(editingNote || inititalFormValues),
    hashTags: editingNote?.hashTags.map((hashTag) => hashTag.text) || [],
  };

  const handleSubmit = (payload: INoteEditForm) => {
    const hashTags = transformTags(payload.hashTags || []);

    editNote({
      ...payload,
      title: payload.title || '',
      description: payload.description || '',
      hashTags,
    });
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
      <Modal backdrop="static" size="md" open={!!editingNote}>
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
