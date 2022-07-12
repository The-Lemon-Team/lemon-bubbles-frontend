import React, { useCallback, useRef } from 'react';
import { Divider, IconButton, Input } from 'rsuite';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import CheckIcon from '@rsuite/icons/Check';

import { HashTextAreaContainer } from '../../containers';
import { HashtagListContainer } from '../../containers';

import styles from './AddNote.module.scss';

import { INoteForm } from '../../../../interfaces';

function findHashtags(searchText: string) {
  const regexp = /\B\#\w\w+\b/g;

  return searchText.match(regexp) || [];
}

interface FormikValues extends Partial<INoteForm> {}

export interface AddNoteProps {
  onAdd: (payload: INoteForm) => void;
}

export const AddNote = ({ onAdd }: AddNoteProps) => {
  const handleSubmit = useCallback(
    (values: FormikValues) => {
      onAdd(values as INoteForm);
    },
    [onAdd],
  );
  const formikRef = useRef<FormikProps<FormikValues>>(null);
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
      innerRef={formikRef}
      initialValues={{
        title: '',
        description: '',
        created: new Date().toString(),
        hashTags: [],
      }}
    >
      {({ handleSubmit }) => {
        return (
          <div>
            <div className={styles.titleWrapper}>
              <p className={styles.title}>Добавить новую запись</p>
              <div>
                <IconButton
                  size="sm"
                  appearance="primary"
                  icon={<CheckIcon />}
                  onClick={() => handleSubmit()}
                  variant="contained"
                  color="green"
                />
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
          </div>
        );
      }}
    </Formik>
  );
};
