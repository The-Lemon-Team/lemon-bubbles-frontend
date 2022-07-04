import React, { useCallback, useRef } from 'react';
import { Button, TextField, Typography, Divider } from '@mui/material';
import { Formik, FormikProps, Field } from 'formik';
import type { FieldProps } from 'formik';
import DoneIcon from '@mui/icons-material/Done';

import { MdEditor } from '../../modules/common/components';
import { HashtagPickerContainer } from '../../modules/hashtags';

import styles from './AddNote.module.scss';

import { IHashTag, INote } from '../../interfaces';

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
              <Typography variant="body1">Добавить новую запись</Typography>
              <div>
                <Button
                  color="success"
                  endIcon={<DoneIcon />}
                  onClick={() => handleSubmit()}
                  variant="contained"
                  sx={{
                    minWidth: 'auto',
                    padding: '10px',
                  }}
                  classes={{
                    endIcon: styles.endIcon,
                  }}
                />
              </div>
            </div>
            <Divider />
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
          </div>
        );
      }}
    </Formik>
  );
};
