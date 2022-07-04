import React, { useCallback, useRef } from 'react';
import { TextField, Typography, Divider } from '@mui/material';
import { Formik, FormikProps, Field } from 'formik';
import type { FieldProps } from 'formik';

import { MdEditor } from '../../modules/common/components';
import { HashtagPickerContainer } from '../../modules/hashtags';

import styles from './AddNote.module.scss';

import { IHashTag, INote } from '../../interfaces';

interface FormikValues extends Partial<INote> {}

export const AddNote = () => {
  const handleSubmit = useCallback(() => {}, []);
  const formikRef = useRef<FormikProps<FormikValues>>(null);
  const handleTextChange = useCallback(
    (text?: string) => {
      formikRef.current?.setFieldValue('description', text || '');
    },
    [formikRef],
  );

  return (
    <div>
      <div className={styles.titleWrapper}>
        <Typography variant="body1">Добавить новую запись</Typography>
      </div>
      <Divider />
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
        {({ values }) => {
          return (
            <div className={styles.formWrapper}>
              <div className={styles.formField}>
                <Field name="title">
                  {({ field }: FieldProps) => {
                    return (
                      <TextField
                        id="outlined-basic"
                        label="Заголовок"
                        variant="standard"
                        fullWidth
                        {...field}
                      />
                    );
                  }}
                </Field>
              </div>
              <div className={styles.formField}>
                <Field name="description">
                  {({ field }: FieldProps) => {
                    return (
                      <MdEditor
                        value={field.value}
                        onChange={handleTextChange}
                      />
                    );
                    // return (
                    //   <TextField
                    //     id="outlined-basic"
                    //     label="Текст"
                    //     variant="standard"
                    //     fullWidth
                    //     {...field}
                    //   />
                    // );
                  }}
                </Field>
              </div>
              <div className={styles.hashtagField}>
                <Field name="hashTags">
                  {({ field, form }: FieldProps) => {
                    return (
                      <HashtagPickerContainer
                        selected={field.value}
                        onChange={(hashTags: IHashTag[]) => {
                          form.setFieldValue('hashTags', hashTags);
                        }}
                      />
                    );
                  }}
                </Field>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};
