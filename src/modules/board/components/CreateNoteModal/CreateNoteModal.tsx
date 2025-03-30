import { FormikProvider, useFormik } from 'formik';
import { Button, Modal } from 'rsuite';

import { useNoteFormAssets } from '../../hooks/useNoteFormAssets';
import { useHashTags } from '../../../common/hooks/useHashTags';
import { useCreateNote } from '../../hooks/useCreateNote';

import { CreateNote } from '../CreateNote';

import styles from './CreateNoteModal.module.scss';

import { INoteCreateForm } from '../../../../interfaces';

const initialValues: INoteCreateForm = {
  title: '',
  description: '',
  created: new Date().toString(),
  hashtags: [],
};

export const CreateNoteModal = () => {
  const { createNote, resetCreatingMode, isCreatingMode } = useCreateNote();
  const { transformTags } = useHashTags();

  const handleSubmit = (payload: INoteCreateForm) => {
    const hashtags = transformTags(payload.hashtags || []);

    createNote({
      ...payload,
      title: payload.title || '',
      description: payload.description || '',
      hashtags,
    }).then(resetCreatingMode);
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
      <Modal backdrop="static" size="md" open={!!isCreatingMode}>
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
          <Button appearance="primary" onClick={formikBag.submitForm}>
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
