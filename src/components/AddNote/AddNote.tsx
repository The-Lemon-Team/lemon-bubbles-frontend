import React, { useCallback, useRef } from 'react';

import { Divider, IconButton, Input } from 'rsuite';
import { Formik, FormikProps, Field, FieldProps } from 'formik';
import CheckIcon from '@rsuite/icons/Check';

import { HashTextArea } from '../../modules/common/components';

import styles from './AddNote.module.scss';

import { INote } from '../../interfaces';

interface FormikValues extends Partial<INote> {}

interface AddNoteProps {
  onAdd: (payload: INote) => void;
}

export const AddNote = ({ onAdd }: AddNoteProps) => {
  const handleSubmit = useCallback(
    (values: FormikValues) => {
      onAdd(values as INote);
    },
    [onAdd],
  );
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const handleTextChange = useCallback(
    (text?: string) => {
      formikRef.current?.setFieldValue('description', text || '');
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
                      <HashTextArea
                        value={field.value}
                        onChange={handleTextChange}
                      />
                    );
                  }}
                </Field>
              </div>
              {/* <div className={styles.hashtagField}>
                <Field name="hashTags">
                  {({ field, form }: FieldProps) => {
                    return <div>hashtags</div>;
                  }}
                </Field>
              </div> */}
            </div>
          </div>
        );
      }}
    </Formik>
  );
};
