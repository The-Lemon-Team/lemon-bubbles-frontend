import React from 'react';
import {
  Autocomplete,
  Paper,
  TextField,
  Typography,
  Divider,
  Select,
  MenuItem,
} from '@mui/material';
import { Formik, Field, FieldArray } from 'formik';
import type { FieldProps } from 'formik';

import { HashtagPickerContainer } from '../HashtagPicker/HashtagPickerContainer';
import styles from './AddNote.module.scss';

import { INote } from '../../interfaces';

export const AddNote = () => {
  return (
    <div>
      <div className={styles.titleWrapper}>
        <Typography variant="body1">Добавить новую запись</Typography>
      </div>
      <Divider />
      <Formik<Partial<INote>>
        onSubmit={console.log}
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
                      <TextField
                        id="outlined-basic"
                        label="Текст"
                        variant="standard"
                        fullWidth
                        {...field}
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
                        onChange={(hashTags) => {
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
