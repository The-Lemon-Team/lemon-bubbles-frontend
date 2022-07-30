import React, { useCallback, useRef } from 'react';
import { Divider, IconButton, Input } from 'rsuite';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import { Panel } from 'rsuite';
import CheckIcon from '@rsuite/icons/Check';
import twitterUtils from 'twitter-text';

import { HashTextAreaContainer, HashtagListContainer } from '../../containers';

import styles from './AddNote.module.scss';

import { INoteForm } from '../../../../interfaces';

interface FormikValues extends Partial<INoteForm> {}

export interface AddNoteProps {
  onAdd: (payload: INoteForm) => void;
}

function findHashtags(searchText: string) {
  const messageText = searchText.replace(/[{}]{2,}/g, '');

  return twitterUtils.extractHashtags(messageText).reduce((acc, cur) => {
    return acc.includes(cur) ? acc : [...acc, cur];
  }, [] as string[]);
}

export const AddNote = ({ onAdd }: AddNoteProps) => {
  const formikRef = useRef<FormikProps<FormikValues>>(null);

  const handleSubmit = useCallback(
    (values: FormikValues) => {
      onAdd(values as INoteForm);
      formikRef.current?.resetForm();
    },
    [onAdd, formikRef],
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
          <Panel bordered shaded expanded className={styles.panel}>
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
          </Panel>
        );
      }}
    </Formik>
  );
};
