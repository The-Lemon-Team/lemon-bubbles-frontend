import { useCallback, useRef } from 'react';
import { Divider, IconButton, Input } from 'rsuite';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import { Panel } from 'rsuite';
import twitterUtils from 'twitter-text';
import CheckIcon from '@rsuite/icons/Check';
import ReloadIcon from '@rsuite/icons/Reload';

import { HashTextAreaContainer, HashtagListContainer } from '../../containers';

import styles from './CreateNote.module.scss';

import { INote } from '../../../../interfaces';
import { INoteForm } from '../../../../interfaces';

interface FormikValues extends Partial<INoteForm> {}

export interface CreateNoteProps {
  selectedToEdit?: INote;

  onSubmit: (payload: INoteForm) => void;
  onReset: () => void;
}

function findHashtags(searchText: string) {
  const messageText = searchText.replace(/[{}]{2,}/g, '');

  return twitterUtils.extractHashtags(messageText).reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
  }, [] as string[]);
}

const inititalFormValues: FormikValues = {
  title: '',
  description: '',
  created: new Date().toString(),
  hashTags: [],
};

export const CreateNote = ({
  selectedToEdit,
  onSubmit,
  onReset,
}: CreateNoteProps) => {
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const initialValues = selectedToEdit
    ? {
        ...selectedToEdit,
        hashTags: selectedToEdit.hashTags.map((hashTag) => hashTag.text),
      }
    : inititalFormValues;

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      onSubmit(values as INoteForm);
      formikRef.current?.resetForm();
    },
    [onSubmit, formikRef],
  );
  const handleTextChange = useCallback(
    (text?: string) => {
      const hashtags = findHashtags(text || '');

      formikRef.current?.setFieldValue('description', text || '');
      formikRef.current?.setFieldValue('hashTags', hashtags);
    },
    [formikRef],
  );
  const handleTitleChange = useCallback(
    (text?: string) => {
      formikRef.current?.setFieldValue('title', text || '');
    },
    [formikRef],
  );

  return (
    <Formik<FormikValues>
      onSubmit={handleSubmit}
      enableReinitialize
      innerRef={formikRef}
      initialValues={initialValues}
    >
      {({ values, handleSubmit }) => {
        const isEditMode = !!values.id;

        return (
          <Panel bordered shaded expanded className={styles.panel}>
            <div className={styles.titleWrapper}>
              <p className={styles.title}>
                {isEditMode ? `Редактировать запись` : 'Добавить новую запись'}
              </p>
              <div className={styles.actionPanel}>
                <div className={styles.actionWrapper}>
                  <IconButton
                    size="sm"
                    appearance="primary"
                    icon={<CheckIcon />}
                    onClick={() => handleSubmit()}
                    variant="contained"
                    color="green"
                  />
                </div>
                <div className={styles.actionWrapper}>
                  <IconButton
                    size="sm"
                    appearance="primary"
                    icon={<ReloadIcon />}
                    onClick={() => onReset()}
                    variant="contained"
                    color="violet"
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div className={styles.formWrapper}>
              <div className={styles.formField}>
                <Field name="title">
                  {({ field }: FieldProps) => {
                    return (
                      <Input
                        size="sm"
                        id="outlined-basic"
                        placeholder="Заголовок"
                        {...field}
                        onChange={handleTitleChange}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.formField}>
                <Field name="description">
                  {({ field }: FieldProps) => {
                    return (
                      <HashTextAreaContainer
                        value={field.value}
                        onChange={handleTextChange}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.hashtagField}>
                <Field name="hashTags">
                  {({ field }: FieldProps) => {
                    return <HashtagListContainer hashtagNames={field.value} />;
                  }}
                </Field>
              </div>
            </div>
          </Panel>
        );
      }}
    </Formik>
  );
};
